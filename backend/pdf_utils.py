import re
from collections import Counter
from typing import List

import pdfplumber

from .config import MIN_EXTRACTED_TEXT_CHARS


def clean_text(text: str) -> str:
    """Normalize whitespace and remove repeated headers/footers."""
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


def extract_text_from_pdf(file_path: str) -> str:
    chunks: List[str] = []

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text(x_tolerance=1, y_tolerance=3) or ""
            if page_text.strip():
                chunks.append(page_text)

    text = clean_text("\n\n".join(chunks))

    # Optional: basic validation
    if len(text) < MIN_EXTRACTED_TEXT_CHARS:
        return ""

    return text
