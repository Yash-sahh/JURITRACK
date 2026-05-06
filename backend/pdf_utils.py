import re
from collections import Counter
from typing import Iterable, List

import pdfplumber
import pytesseract
from PIL import Image

from .config import MIN_EXTRACTED_TEXT_CHARS, OCR_DPI


def clean_text(text: str) -> str:
    """Normalize whitespace and remove obvious repeated headers/footers."""
    lines = [re.sub(r"\s+", " ", line).strip() for line in text.splitlines()]
    lines = [line for line in lines if line]

    counts = Counter(lines)
    if len(lines) >= 30:
        lines = [
            line
            for line in lines
            if not (counts[line] >= 3 and len(line) <= 120)
        ]

    cleaned = "\n".join(lines)
    cleaned = re.sub(r"[ \t]+", " ", cleaned)
    cleaned = re.sub(r"\n{3,}", "\n\n", cleaned)
    return cleaned.strip()


def _extract_with_pdfplumber(file_path: str) -> str:
    chunks: List[str] = []
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text(x_tolerance=1, y_tolerance=3) or ""
            if page_text.strip():
                chunks.append(page_text)
    return clean_text("\n\n".join(chunks))


def _images_from_pdf(file_path: str) -> Iterable[Image.Image]:
    try:
        from pdf2image import convert_from_path
    except ImportError as exc:
        raise RuntimeError(
            "OCR fallback requires pdf2image. Install it and Poppler to process scanned PDFs."
        ) from exc

    return convert_from_path(file_path, dpi=OCR_DPI)


def _extract_with_ocr(file_path: str) -> str:
    chunks: List[str] = []
    for image in _images_from_pdf(file_path):
        page_text = pytesseract.image_to_string(image)
        if page_text.strip():
            chunks.append(page_text)
    return clean_text("\n\n".join(chunks))


def extract_text_from_pdf(file_path: str) -> str:
    text = _extract_with_pdfplumber(file_path)
    if len(text) >= MIN_EXTRACTED_TEXT_CHARS:
        return text

    ocr_text = _extract_with_ocr(file_path)
    return ocr_text if len(ocr_text) > len(text) else text

