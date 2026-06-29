from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontedn"

app = Flask(__name__, static_folder=str(FRONTEND_DIR), static_url_path="")

signups = []

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()

    if not name or not email:
        return jsonify({"success": False, "message": "Name and email are required."}), 400

    signups.append({"name": name, "email": email})
    return jsonify({"success": True, "message": f"Thanks {name}! Don't wait till it's too late — sign now!"})

@app.route("/api/signups", methods=["GET"])
def get_signups():
    return jsonify(signups)

if __name__ == "__main__":
    app.run(debug=True, port=5000)