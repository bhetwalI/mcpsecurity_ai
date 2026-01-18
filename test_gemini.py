import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
model_name = os.getenv("GEMINI_MODEL", "gemini-2.0-flash-exp")

print(f"Testing Gemini API Key: {api_key[:10]}...{api_key[-5:] if api_key else 'None'}")
print(f"Model: {model_name}")

if not api_key:
    print("Error: GEMINI_API_KEY not found in environment variables.")
    exit(1)

try:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(model_name)
    response = model.generate_content("Hello, can you hear me? precise answer")
    print("\n--- Success! ---")
    print(f"Response: {response.text}")
except Exception as e:
    print("\n--- Failed! ---")
    print(f"Error: {str(e)}")
