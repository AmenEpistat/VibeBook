import json
import torch
import torch.nn as nn

from model import BookModel

with open("../backend/preference/all_books.json", "r") as f:
    all_books = json.load(f)
book2idx = {book_id: i for i, book_id in enumerate(all_books)}

NUM_BOOKS = len(all_books)
NUM_TESTS = 10

with open("../backend/preference/synthetic_dataset.json", "r") as f:
    dataset = json.load(f)

X_list = []
Y_list = []

for sample in dataset:
    answers = sample["answers"]
    x = [answers.get(f"q{i+1}", 0) for i in range(NUM_TESTS)]
    X_list.append(x)

    y = [0] * NUM_BOOKS
    for book_id in sample["books"]:
        idx = book2idx[book_id]
        y[idx] = 1
    Y_list.append(y)

X = torch.tensor(X_list, dtype=torch.float32)
Y = torch.tensor(Y_list, dtype=torch.float32)
print(f"X: {X.shape}, Y: {Y.shape}")

model = BookModel(NUM_TESTS, NUM_BOOKS)
loss_fn = nn.BCELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

EPOCHS = 50
for epoch in range(EPOCHS):
    pred = model(X)
    loss = loss_fn(pred, Y)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    print(f"Epoch {epoch+1}/{EPOCHS} | loss={loss.item():.4f}")

torch.save(model.state_dict(), "model.pth")
print("MODEL TRAINED CORRECTLY")
