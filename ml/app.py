from flask import Flask, request, jsonify
import torch
from model import BookModel
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open("../backend/preference/all_books.json", "r") as f:
    all_books = json.load(f)

NUM_BOOKS = len(all_books)
NUM_TESTS = 10

model = BookModel(NUM_TESTS, NUM_BOOKS)
model.load_state_dict(torch.load("model.pth"))
model.eval()

@app.route("/predict", methods=["POST"])
def predict():
    try:
        answers = request.json.get("answers")
        if not answers or len(answers) != NUM_TESTS:
            return jsonify({"error": "Неверное количество ответов"}), 400

        x = torch.tensor(answers, dtype=torch.float32).unsqueeze(0)

        with torch.no_grad():
            scores = torch.sigmoid(model(x))[0].tolist()

        ranked = list(zip(all_books, scores))
        ranked.sort(key=lambda x: x[1], reverse=True)

        TOP_K = 5
        top_books = [
            {"bookId": book_id, "score": float(score)}
            for book_id, score in ranked[:TOP_K]
        ]

        return jsonify({"topBooks": top_books})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000)
