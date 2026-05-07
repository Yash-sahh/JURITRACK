import google.generativeai as genai
import os
import re
import json

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY is not set. Please add it to your .env file or environment variables.")

genai.configure(api_key=api_key)
model_name = os.getenv("GEMINI_MODEL", "gemini-flash-lite-latest")
model = genai.GenerativeModel(model_name)


def _extract_json_payload(text):
    if text is None:
        return text

    cleaned = str(text).strip()

    # Remove markdown code fences if present
    if cleaned.startswith("```") and cleaned.endswith("```"):
        lines = cleaned.splitlines()
        if len(lines) >= 3 and lines[0].startswith("```") and lines[-1].strip() == "```":
            inner = "\n".join(lines[1:-1]).strip()
            if inner.lower().startswith("json"):
                inner = inner.split("\n", 1)[1].strip() if "\n" in inner else ""
            cleaned = inner

    # Extract first JSON object block
    match = re.search(r"(\{.*\})", cleaned, re.S)
    return match.group(1).strip() if match else cleaned


def generate_action_plan(text):
    response = None
    try:
        prompt = f"""You are an AI system that extracts actionable insights from court judgments.

Judgment text:
{text}

From the given text, extract:

1. Case name
2. Parties involved
3. Date of judgment
4. Key directions/orders (only actionable ones)
5. Deadlines (if mentioned)

Then convert into structured actionable tasks.

Return STRICT JSON in this format:

{{
  "case": "",
  "parties": "",
  "date": "",
  "actions": [
    {{
      "action": "",
      "department": "",
      "deadline": "",
      "risk": "High/Medium/Low"
    }}
  ]
}}

Rules:
- Only include real actions (ignore explanations)
- Keep actions short and clear
- If deadline not present -> null
- Infer department logically
- Risk:
    High -> legal/financial urgency
    Medium -> important but not urgent
    Low -> informational
- Return only the JSON object and do not wrap it in markdown code fences or any extra text."""

        response = model.generate_content(prompt)
        response_text = getattr(response, "text", None)
        if not response_text and hasattr(response, "content"):
            response_text = getattr(response, "content", None)

        if not response_text or not str(response_text).strip():
            raise ValueError("Gemini returned empty response text")

        cleaned_text = _extract_json_payload(response_text)
        if not cleaned_text or not cleaned_text.strip():
            raise ValueError("Failed to extract a JSON payload from the Gemini response")

        try:
            return json.loads(cleaned_text)
        except json.JSONDecodeError as json_err:
            raise ValueError(
                f"Gemini returned invalid JSON after cleaning: {cleaned_text!r}"
            ) from json_err

    except Exception as e:
        print("Gemini failed, using fallback")
        print(f"Error: {e}")
        print(f"Error type: {type(e).__name__}")
        if response is not None:
            print(f"Response text: {getattr(response, 'text', getattr(response, 'content', '<no text>'))}")

        return {
            "case": "",
            "parties": "",
            "date": "",
            "actions": [],
            "error": str(e),
            "raw_response": getattr(response, "text", getattr(response, "content", None))
        }
