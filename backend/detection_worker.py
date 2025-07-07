# detection_worker.py

import cv2
import time
from ultralytics import YOLO
from datetime import datetime
from sklearn.cluster import KMeans

# Store state for cart threads
cart_thread_states = {}

# Map YOLO class labels to product names
CLASS_TO_PRODUCT = {
    "maggi-noodles": "Maggi",
    "nevia-cream": "Nivea",
    # Add more class-to-product mappings as needed
}

def detect_color(image, k=2):
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

def start_detection_thread(cart_id, db):
    cart_ref = db.collection("carts").document(cart_id)
    cart_doc = cart_ref.get()
    if not cart_doc.exists:
        print(f"[{cart_id}] Cart doc missing")
        return

    cart_data = cart_doc.to_dict()
    ip_url = cart_data["ip_stream_url"]
    session_id = cart_data["session_id"]

    session_doc = db.collection("sessions").document(session_id).get()
    if not session_doc.exists:
        print(f"[{cart_id}] Session doc missing")
        return

    session_data = session_doc.to_dict()
    scanned_items = session_data.get("scanned_items", [])
    user_email = session_data.get("email")  # use email instead of user_id

    print(f"[{cart_id}] Starting webcam detection...")
    cap = cv2.VideoCapture(ip_url)
    if not cap.isOpened():
        print(f"[{cart_id}] Webcam not accessible.")
        return

    model = YOLO("model_single.pt")
    detected_items = set()
    last_log_time = time.time()
    CONF_THRESHOLD = 0.6
    

    while True:
        # Check if cart still active
        cart_data = cart_ref.get().to_dict()
        if not cart_data.get("active", False):
            print(f"[{cart_id}] Stopping detection (inactive cart).")
            break

        ret, frame = cap.read()
        if not ret:
            continue

        results = model(frame)[0]
        current_frame_detections = set()

        for box in results.boxes:
            if box.conf[0] < CONF_THRESHOLD:
                continue
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cls_id = int(box.cls[0])
            label = model.names[cls_id]
            product_name = CLASS_TO_PRODUCT.get(label, label)

            color = detect_color(frame[y1:y2, x1:x2])
            
            current_frame_detections.add(product_name)
            detected_items.add(product_name)

            # === UI Hook: Admin/User Alert ===
            # Replace this with socket event or Firestore flag later
            # print(f"[{cart_id}] Detected {product_name}-{color}")

        # Theft detection: compare sets
        unscanned = current_frame_detections - set(scanned_items)
        missing = set(scanned_items) - current_frame_detections

        if unscanned or missing:
            print(f"[{cart_id}] ⚠️ Theft Alert:")
            if unscanned:
                print(f"  - Unscanned items: {unscanned}")
            if missing:
                print(f"  - Scanned but missing: {missing}")

        # Every 2 minutes, log detection state
        if time.time() - last_log_time >= 10:
            log = {
                "timestamp": datetime.now().isoformat(),
                "session_id": session_id,
                "user_email": user_email,
                "detected_items": list(detected_items),
                "missing_scanned_items": list(missing),
                "unscanned_detected_items": list(unscanned),
                "cart_id": cart_id
            }

            try:
                log_ref = db.collection("cart_logs").document(cart_id)
                log_ref.set(log)  # overwrite if exists
                print(f"[{cart_id}] ✅ Updated cart_logs document.")
            except Exception as e:
                print(f"[{cart_id}] ❌ Firestore log failed: {e}")

            last_log_time = time.time()  # move this inside the if-block



        cv2.waitKey(1)

    cap.release()
    print(f"[{cart_id}] Detection thread closed.")