# manager.py
# Manages detection threads for all carts based on Firestore 'active' flag

import threading
import time
import firebase_admin
from firebase_admin import credentials, firestore
from detection_worker import start_detection_thread
from config import SERVICE_ACCOUNT_KEY_PATH

cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
firebase_admin.initialize_app(cred)
db = firestore.client()

# Track running threads
active_threads = {}

while True:
    print("[Manager] Checking for active carts...")
    carts_ref = db.collection("carts")
    carts = carts_ref.stream()

    for cart in carts:
        cart_id = cart.id
        data = cart.to_dict()
        active = data.get("active", False)

        # Start thread if active and not already running
        if active and cart_id not in active_threads:
            print(f"[Manager] Starting detection for cart {cart_id}")
            t = threading.Thread(target=start_detection_thread, args=(cart_id, db), daemon=True)
            t.start()
            active_threads[cart_id] = t

        # Stop thread if no longer active
        if not active and cart_id in active_threads:
            print(f"[Manager] Marking cart {cart_id} for shutdown")
            # Detection thread will detect this in its loop
            del active_threads[cart_id]

    time.sleep(10)  # Check every 10 seconds
