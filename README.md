# Smart Cart System 🛒

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![YOLOv8](https://img.shields.io/badge/YOLOv8-Object%20Detection-green.svg)](https://github.com/ultralytics/ultralytics)
[![Firebase](https://img.shields.io/badge/Firebase-Backend-orange.svg)](https://firebase.google.com)
[![HTML5](https://img.shields.io/badge/HTML5-Frontend-red.svg)](https://html.spec.whatwg.org/)

A comprehensive smart shopping cart system designed for Walmart retail environments, featuring real-time object detection, user management, and integrated payment gateway solutions.

## 🚀 Features

- **Real-time Object Detection**: Advanced YOLOv8-based product recognition
- **Multi-threaded Cart Management**: Concurrent handling of multiple shopping carts
- **User Authentication**: Secure login system for customers and administrators
- **Payment Integration**: Digital wallet and payment gateway functionality
- **Admin Dashboard**: Comprehensive analytics and monitoring interface
- **Responsive Design**: Mobile-friendly web interface
- **Firebase Integration**: Cloud-based data storage and real-time synchronization
- **Chatbot Support**: Interactive customer assistance

## 📁 Project Structure

```
smart-cart-system/
├── backend/                    # Backend Python services
│   ├── detection_worker.py     # Object detection worker thread
│   ├── manager.py              # Thread manager for cart detection
│   ├── smart_cart_detection.py # Main detection script
│   ├── models/                 # AI/ML model files
│   │   ├── model_single.pt     # Custom trained YOLOv8 model
│   │   └── yolov8n.pt          # Base YOLOv8 nano model
│   └── config/                 # Configuration files
│       └── serviceAccountKey.json # Firebase service account key
├── frontend/                   # Frontend web application
│   ├── pages/                  # HTML pages
│   │   ├── dashboard.html      # Admin dashboard
│   │   ├── landing_page.html   # Main landing page with login
│   │   ├── user_dash.html      # User dashboard
│   │   └── wallet_gateway.html # Payment gateway
│   ├── css/                    # Stylesheets
│   │   ├── chatbot.css         # Chatbot interface styling
│   │   ├── dashboard_styles.css # Admin dashboard styles
│   │   ├── gateway_style.css   # Payment gateway styles
│   │   ├── landing_style.css   # Landing page styles
│   │   └── user_style.css      # User dashboard styles
│   ├── js/                     # JavaScript files
│   │   ├── chatbot.js          # Chatbot functionality
│   │   ├── dashboard_script.js # Admin dashboard logic
│   │   ├── landing_script.js   # Landing page interactions
│   │   └── user_script.js      # User dashboard functionality
│   └── assets/                 # Static assets
│       └── images/             # UI images and graphics
│           ├── background.jpg  # Main background image
│           ├── bg.jpg          # Secondary background
│           ├── cart.png        # Cart icon
│           ├── footer.jpg      # Footer background
│           ├── imgcards.png    # Card images
│           └── profile-1.jpg   # Profile placeholder
└── README.md                   # Project documentation
```

## 🔧 Components Overview

### Backend Services

#### `detection_worker.py`
- Handles real-time object detection for individual shopping carts
- Implements multithreading for concurrent cart monitoring
- Integrates with YOLOv8 models for product identification

#### `manager.py`
- Manages multiple detection threads based on cart activity
- Coordinates resource allocation across active carts
- Handles cart lifecycle management

#### `smart_cart_detection.py`
- Standalone detection script for testing and development
- Contains core detection algorithms and image processing logic
- Supports both single and batch processing modes

### Frontend Pages

#### `landing_page.html`
- Main entry point with user authentication
- Supports both customer and administrator login
- Responsive design with modern UI elements

#### `dashboard.html`
- Comprehensive admin dashboard for system monitoring
- Real-time analytics and cart activity visualization
- User management and system configuration tools

#### `user_dash.html`
- Customer interface for cart management
- Wallet balance display and transaction history
- Interactive product scanning interface

#### `wallet_gateway.html`
- Secure payment processing interface
- Multiple payment method support
- Transaction confirmation and receipt generation

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase account with Firestore database
- Webcam or camera for product detection

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-cart-system
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration values in the `.env` file
   - Copy `frontend/js/config.example.js` to `frontend/js/config.js`
   - Fill in your Firebase configuration values in `frontend/js/config.js`

3. **Configure Firebase Service Account**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Generate a service account key
   - Download the JSON file and save it as `backend/config/serviceAccountKey.json`

4. **Install Python dependencies**
   ```bash
   pip install opencv-python ultralytics firebase-admin scikit-learn numpy torch torchvision
   ```

5. **Model Setup**
   - The `yolov8n.pt` model will be downloaded automatically
   - Place your custom trained model as `model_single.pt` in the `backend/models/` directory
   - Update model paths in configuration files if needed

### Frontend Setup

1. **Start the application**
   - Open `frontend/pages/landing_page.html` in your web browser
   - No additional server setup required for basic functionality

2. **For development with live server**
   - Use a local development server (Live Server extension in VS Code recommended)
   - Ensure proper CORS settings for Firebase integration

## 🚀 Usage Guide

### For Customers

1. **Login**: Access the system through the landing page
2. **Cart Selection**: Choose an available smart cart
3. **Shopping**: Add items to your cart - they'll be detected automatically
4. **Payment**: Use the integrated wallet system for seamless checkout
5. **Receipt**: View transaction history and receipts

### For Administrators

1. **Admin Login**: Use administrator credentials on the landing page
2. **Dashboard**: Monitor active carts and system performance
3. **User Management**: Add/remove users and manage permissions
4. **Analytics**: View sales data and system usage statistics
5. **Configuration**: Adjust detection sensitivity and system settings

## 🔄 Navigation Flow

```
landing_page.html (Login)
    ├── User Login → user_dash.html
    │   └── Add Money → wallet_gateway.html
    └── Admin Login → dashboard.html
```

## 📊 System Architecture

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Python with OpenCV and YOLOv8
- **Database**: Firebase Firestore
- **AI/ML**: YOLOv8 for object detection
- **Payment**: Integrated wallet system

## 🔒 Security Features

- Secure user authentication
- Encrypted payment processing
- Firebase security rules
- Input validation and sanitization
- Session management

## 🤖 AI/ML Components

- **YOLOv8 Object Detection**: Real-time product identification
- **Custom Model Training**: Specific to retail products
- **Multi-object Tracking**: Handles multiple items simultaneously
- **Confidence Scoring**: Accuracy thresholds for reliable detection

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean, intuitive user experience
- **Real-time Updates**: Live cart status and notifications
- **Interactive Chatbot**: Customer support integration

## 🔧 Configuration

### Environment Variables
The `.env` file contains backend configuration:
```env
# Firebase Configuration
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID_LANDING=your-app-id-for-landing-page
FIREBASE_APP_ID_MAIN=your-app-id-for-main-pages
FIREBASE_MEASUREMENT_ID_LANDING=your-measurement-id-for-landing
FIREBASE_MEASUREMENT_ID_MAIN=your-measurement-id-for-main

# Backend Configuration
IP_STREAM_URL=http://your-ip-address:8080/video
YOLO_MODEL_PATH=models/model_single.pt
CONFIDENCE_THRESHOLD=0.5
```

### Frontend Configuration
Update `frontend/js/config.js` with your Firebase project credentials.

**⚠️ Important Security Notes:**
- Never commit your actual `.env` file or `config.js` with real credentials
- The `.gitignore` file is configured to exclude these sensitive files
- Use the example files (`.env.example` and `config.example.js`) as templates

## 🔒 Security Setup

This project uses environment variables to keep sensitive information secure. Follow these steps after cloning:

1. **Backend Configuration:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual Firebase and camera configuration
   ```

2. **Frontend Configuration:**
   ```bash
   cp frontend/js/config.example.js frontend/js/config.js
   # Edit config.js with your actual Firebase configuration
   ```

3. **Firebase Service Account:**
   - Download your Firebase service account JSON file
   - Save it as `backend/config/serviceAccountKey.json`

4. **Verify Security:**
   - Ensure `.env`, `config.js`, and `serviceAccountKey.json` are in `.gitignore`
   - Double-check these files won't be committed before pushing to GitHub

## 🐛 Troubleshooting

### Common Issues

1. **Model Loading Errors**
   - Ensure model files are in the correct directory
   - Check file permissions and paths

2. **Firebase Connection Issues**
   - Verify service account key is properly configured
   - Check internet connectivity and Firebase project status

3. **Camera Access Problems**
   - Grant camera permissions in browser
   - Ensure camera is not being used by other applications