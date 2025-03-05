import requests
import os
from dotenv import load_dotenv
from pathlib import Path
from pydantic import BaseModel

# Get the absolute path to the .env file
base_dir = Path(__file__).resolve().parent.parent
env_path = os.path.join(base_dir, '.env')

# Load the .env file
load_dotenv(dotenv_path=env_path)

# Get environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
FINE_TUNED_MODEL_ID = os.getenv("FINE_TUNED_MODEL_ID")

class EmailData(BaseModel):
    subject: str
    body: str
    sender: str

def check_model_health():
    """Check if OpenAI API and fine-tuned model are available."""
    # First check if credentials exist
    if not OPENAI_API_KEY:
        return {
            "openai_api_ready": False,
            "model_ready": False,
            "error": "Missing OpenAI API key in .env file"
        }
    
    if not FINE_TUNED_MODEL_ID:
        return {
            "openai_api_ready": False,
            "model_ready": False,
            "error": "Missing fine-tuned model ID in .env file"
        }

    headers = {"Authorization": f"Bearer {OPENAI_API_KEY}"}
    try:
        # Get all models from OpenAI
        response = requests.get("https://api.openai.com/v1/models", headers=headers)
        if response.status_code == 200:
            models = response.json()["data"]
            is_model_ready = any(model["id"] == FINE_TUNED_MODEL_ID for model in models)
            if not is_model_ready:
                return {
                    "openai_api_ready": True,
                    "model_ready": False,
                    "error": f"Model ID {FINE_TUNED_MODEL_ID} not found in available models"
                }
            return {"openai_api_ready": True, "model_ready": True}
        else:
            return {
                "openai_api_ready": False,
                "model_ready": False,
                "error": f"OpenAI API returned status code: {response.status_code}"
            }
    except Exception as e:
        return {"openai_api_ready": False, "model_ready": False, "error": str(e)}
    

def analyze_email(email: EmailData):
    """Analyze email for phishing using OpenAI API."""
    # Print received data for verification
    print("\n=== Received Email Data ===")
    print(f"Subject: {email.subject}")
    print(f"Body: {email.body}")
    print(f"Sender: {email.sender}")
    print("========================\n")

    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }

    prompt = f"Analyze the following email for phishing:\nSubject: {email.subject}\nBody: {email.body}\nSender: {email.sender}"
    system_prompt = '''You are a cybersecurity expert trained to detect spear phishing email attempts. Analyze each provided email carefully and respond:

Output '0' if the email is legitimate, and briefly state clearly why it's considered legitimate (e.g., known sender, appropriate context, no suspicious links).

Output '1' if the email is a spear phishing or phishing attempt, and briefly specify exactly what makes it suspicious (e.g., unfamiliar sender, unexpected request, deceptive links, urgency, unusual language).

Ensure each response is precise, accurate, concise, and directly addresses key identifying features.'''
    data = {
        "model": FINE_TUNED_MODEL_ID,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data)
    print(response.status_code)
    if response.status_code == 200:
        # Store the raw response
        raw_response = response.json()
        print("\n=== Raw Model Response ===")
        print(raw_response)
        print("========================\n")
        
        # Get the model's content
        model_content = raw_response["choices"][0]["message"]["content"]
        print("\n=== Model's Analysis ===")
        print(model_content)
        print("========================\n")
        
        # Return the processed result
        return {"is_phishing": model_content.startswith("1"), "explanation": model_content}
    
    raise Exception("Failed to analyze email")
