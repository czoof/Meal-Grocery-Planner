from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {"message": "Meal Planner Backend Running!"}

if __name__ == "__main__":
    # IMPORTANT: host="0.0.0.0" is REQUIRED for Docker container access
    app.run(host="0.0.0.0", port=5000)
