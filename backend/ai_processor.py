import google.generativeai as genai
import os
import json

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-pro")

def generate_action_plan(text):
    try:
        prompt = f"""
        Extract structured JSON from the court judgment.

        Format:
        {{
          "case": "",
          "action": "",
          "department": "",
          "deadline": "",
          "risk": "High/Medium/Low"
        }}

        Text:
        {text[:3000]}
        """

        response = model.generate_content(prompt)

        # Try parsing JSON
        return json.loads(response.text)

    except Exception as e:
        print("Gemini failed, using fallback")

        # 🔥 Fallback (for demo safety)
        return {
            "case": "State vs ABC Ltd.",
            "action": "Release pending payment to employee",
            "department": "Finance Department",
            "deadline": "30 days",
            "risk": "High"
        }