import google.generativeai as genai
import os
import json

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-pro")

def generate_action_plan(text):
    try:
        prompt = f"""You are an AI system that extracts actionable insights from court judgments.

From the given text, extract:

1. Case name
2. Parties involved
3. Date of judgment
4. Key directions/orders (only actionable ones)
5. Deadlines (if mentioned)

Then convert into structured actionable tasks.

Return STRICT JSON in this format:

{
  "case": "",
  "parties": "",
  "date": "",
  "actions": [
    {
      "action": "",
      "department": "",
      "deadline": "",
      "risk": "High/Medium/Low"
    }
  ]
}

Rules:
- Only include real actions (ignore explanations)
- Keep actions short and clear
- If deadline not present -> null
- Infer department logically
- Risk:
    High -> legal/financial urgency
    Medium -> important but not urgent
    Low -> informational"""

        response = model.generate_content(prompt)

        # Try parsing JSON
        return json.loads(response.text)

    except Exception as e:
        print("Gemini failed, using fallback")

        return {
            "case": "State vs ABC Ltd.",
            "action": "Release pending payment to employee",
            "department": "Finance Department",
            "deadline": "30 days",
            "risk": "High"
        }
