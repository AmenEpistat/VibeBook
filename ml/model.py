import torch.nn as nn

class BookModel(nn.Module):
    def __init__(self, num_tests, num_books):
        super().__init__()
        self.fc1 = nn.Linear(num_tests, 64)
        self.fc2 = nn.Linear(64, num_books)

    def forward(self, x):
        x = nn.ReLU()(self.fc1(x))
        return nn.Sigmoid()(self.fc2(x))
