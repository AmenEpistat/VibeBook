**VibeBook** is a web application that recommends books to users based on their preferences (survey) and selected genres.
The frontend is built with **Vue**, the server is **Node.js + Express**, data is stored in **MongoDB**, and the recommendation logic is implemented using a **ML model prototype** using a neural network on PyTorch.
The project is fully containerized using **Docker**, which allows you to run the entire infrastructure (Frontend, Backend, ML service) with a single command.

---
## 📸 


https://github.com/user-attachments/assets/dbd9ec37-1aef-4eeb-ae62-4fc04c205a6a

<img width="900" height="747" alt="Снимок экрана 2026-01-30 в 9 44 16 PM" src="https://github.com/user-attachments/assets/1baf0220-cf5d-4c10-9756-2abfac9ef702" />

---

## 🚀 Features

### For Users

* Registration
* Browse the book catalog
* View book details
* Receive personalized recommendations
* Profile with books in different statuses (read, want to read, etc.)

### Admin Features

* Add new books to the catalog
* Edit book descriptions
* Manage genres
* Manage authors
* Add admins

---

## 🛠️ Technologies

### **Frontend**

* Vue 3
* Composition API
* Vue Router
* Pinia
* Typescript
* Axios

### **Backend**

* Node.js
* Express
* REST API
* JWT Authentication
* Axios

### **Database**

* MongoDB (Mongoose)

### **ML / Recommendation Engine**

* Python 3.11
* PyTorch
* Flask
* Flask-CORS

---

## ⚙️ How to Run

### 1. Clone the project

```bash
git clone https://github.com/AmenEpistat/VibeBook.git
cd VibeBook
```
### 2. Configure environment variables

Create a `.env` file in the `backend` folder:

```
PORT=3000
MONGO_URL=mongo_url
JWT_ACCESS_KEY=access
JWT_REFRESH_KEY=refresh
SMTP_HOST=smtp.mail.ru
SMTP_PORT=000
SMTP_USER=example@mail.ru
SMTP_PASSWORD=password
API_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173

```

### 3. Project Launch

Make sure that you have **Docker** and **Docker Compose** installed.

```bash
docker compose up -d --build
```
Проект будет доступен по адресу: `http://localhost:5173`

## 🧠 Model training and data
The system uses **Shared Volumes** to synchronize data between **Nodes.js** and **Python**.

#### Data collection: 
The backend generates `all_books.json` and `synthetic_dataset.json` to a shared folder.

#### Training: 
To update the weights of the model without reassembling the container, do:
```bash
docker compose exec python-app python train.py
```
#### Application: 
The Flask server automatically picks up the model.pth after training.

## 🛠 Problem solving (Troubleshooting)
1. `ENOTFOUND python-app error (in the Backend logs)`

Reason: The backend cannot find the ML service on the Docker network.

Solution: Check what's in the PreferenceService.the js URL is specified http://python-app:8000 , not localhost. Make sure that the python-app container is running (docker compose ps).

2. `Error FileNotFoundError: all_books.json (in ML logs)`

Reason: The data files have not yet been created by the backend or sent through the volumes.

Solution: Log into the container with the docker compose exec python-app ls /app/data command. If the folder is empty, check the paths in docker-compose.yml.

3. TLS handshake timeout error during build

Reason: Problems with the Internet or proxy when downloading images (Node/Python).

Solution: Check the proxy settings in Docker Desktop (Settings -> Resources -> Proxies) or try to change the Wi-Fi and turn off the VPN

4. Changes in the code are not displayed

Solution: If you have added new dependencies to the package.json or requirements.txt , be sure to run:

```bash
docker compose up -d --build
```

## 📄 License
This project is licensed under the MIT License — you are free to use, modify, and distribute this project with proper attribution.
See the full text in the [LICENSE](./LICENSE) file.


---

