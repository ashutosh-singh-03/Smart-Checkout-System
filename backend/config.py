"""
Configuration module for the Smart Cart System backend.
Loads settings from environment variables or .env file.
"""

import os
from pathlib import Path

# Load .env file if it exists
def load_env_file():
    env_path = Path(__file__).parent.parent / '.env'
    if env_path.exists():
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip()

# Load environment variables
load_env_file()

# Configuration settings
IP_STREAM_URL = os.getenv('IP_STREAM_URL', 'http://192.168.29.115:8080/video')
YOLO_MODEL_PATH = os.getenv('YOLO_MODEL_PATH', 'models/model_single.pt')
CONFIDENCE_THRESHOLD = float(os.getenv('CONFIDENCE_THRESHOLD', '0.5'))
SERVICE_ACCOUNT_KEY_PATH = 'config/serviceAccountKey.json'

# Test the configuration when run directly
if __name__ == "__main__":
    print("✅ Backend configuration loaded successfully!")
    print(f"IP Stream URL: {IP_STREAM_URL}")
    print(f"Model Path: {YOLO_MODEL_PATH}")
    print(f"Confidence Threshold: {CONFIDENCE_THRESHOLD}")
    print(f"Service Account Key: {SERVICE_ACCOUNT_KEY_PATH}")