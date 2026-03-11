from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import numpy as np
app = Flask(__name__)
CORS(app)

# Load pretrained YOLO model
model = YOLO("yolov8n.pt")

@app.route("/detect-damage", methods=["POST"])
def detect_damage():

    file = request.files["image"]

    img = cv2.imdecode(
        np.frombuffer(file.read(), np.uint8),
        cv2.IMREAD_COLOR
    )

    results = model(img)

    detections = []

    for r in results:
        for box in r.boxes:
            detections.append({
                "class": int(box.cls),
                "confidence": float(box.conf)
            })

    return jsonify({
        "message": "Detection complete",
        "detections": detections
    })


if __name__ == "__main__":
    app.run(port=5001)