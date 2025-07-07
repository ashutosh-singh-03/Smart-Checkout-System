import cv2
import numpy as np
from ultralytics import YOLO
from sklearn.cluster import KMeans
from config import IP_STREAM_URL, YOLO_MODEL_PATH, CONFIDENCE_THRESHOLD

# === INIT YOLOv8 MODEL ===
model = YOLO(YOLO_MODEL_PATH)

# === COLOR DETECTION ===
def detect_dominant_color(image, k=2):
    image = cv2.resize(image, (50, 50))
    image = image.reshape((-1, 3))
    kmeans = KMeans(n_clusters=k, n_init=10)
    kmeans.fit(image)
    dominant = kmeans.cluster_centers_[0].astype(int)
    r, g, b = dominant
    if r > 150 and g < 100 and b < 100:
        return "Red"
    elif b > 150 and r < 100:
        return "Blue"
    elif g > 150 and r < 100:
        return "Green"
    elif r > 150 and g > 150 and b < 100:
        return "Yellow"
    else:
        return "Other"

# === OPEN IP WEBCAM ===
cap = cv2.VideoCapture(IP_STREAM_URL)
if not cap.isOpened():
    print("❌ Could not connect to IP webcam. Check IP address.")
    exit()

print("✅ Webcam connected. Press 'q' to exit.")

# Initialize CART_ROI after reading first frame
ret, frame = cap.read()
if not ret:
    print("⚠️ Failed to read first frame.")
    exit()

frame_height, frame_width = frame.shape[:2]
CART_ROI = (0, 0, frame_width, frame_height)  # Full frame as cart area

while True:
    # Step 1: Read frame
    ret, frame = cap.read()
    if not ret:
        print("⚠️ Failed to read frame.")
        break

    # Step 2: Object Detection
    results = model(frame)[0]

    for box in results.boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        cls_id = int(box.cls[0])
        label = model.names[cls_id]
        box_coords = (x1, y1, x2, y2)

        # Detect color
        roi = frame[y1:y2, x1:x2]
        if roi.size != 0:
            color = detect_dominant_color(roi)
        else:
            color = "Unknown"

        # Draw bounding box and label
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(frame, f"{label}-{color}", (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

    # Optional: Show full-frame cart area box
    cv2.rectangle(frame, (CART_ROI[0], CART_ROI[1]), (CART_ROI[2], CART_ROI[3]), (255, 255, 0), 2)
    cv2.putText(frame, "Full Cart View", (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                0.8, (255, 255, 0), 2)

    # Step 3: Show frame
    cv2.imshow("Smart Cart - YOLO + Color Detection", frame)
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
