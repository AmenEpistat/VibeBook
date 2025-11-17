**VibeBook** is a web application that recommends books to users based on their preferences (survey) and selected genres.
The frontend is built with **Vue**, the server is **Node.js + Express**, data is stored in **MongoDB**, and the recommendation logic is implemented using a **ML model prototype** (content-based filtering + learnable preference model).

---
## 📸 
<img width="700" height="426" alt="Снимок экрана 2025-11-17 в 7 34 07 PM" src="https://github.com/user-attachments/assets/69ffe97e-a193-4ff0-b723-7f93f0595790" />
<img width="700" height="426" alt="Снимок экрана 2025-11-17 в 7 34 24 PM" src="https://github.com/user-attachments/assets/837d7106-58b8-49a8-9d34-7d479656d0e2" />


---

## 🚀 Features

### For Users

* Browse the book catalog
* Filter by genres and authors
* View book details
* Rate books (like / rating)
* Receive personalized recommendations
* Profile with books in different statuses (read, want to read, etc.)

### Admin Features

* Add new books to the catalog
* Edit book descriptions
* Manage genres
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

### **Database**

* MongoDB (Mongoose)

### **ML / Recommendation Engine**

* Content-based filtering
* Simple learnable preference model
* Genre vectorization

---

## ⚙️ How to Run

### 1. Clone the project

```bash
git clone https://github.com/AmenEpistat/VibeBook.git
cd VibeBook
```

### 2. Install dependencies

#### Frontend:

```bash
cd frontend
npm install
```

#### Backend:

```bash
cd backend
npm install
```

### 3. Configure environment variables

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

### 4. Start the project

#### Backend:

```bash
npm run dev
```

#### Frontend:

```bash
npm run dev
```

## 📂 Структура проекта
```bash
VibeBook/
├── .idea/
│
├── backend/
│   ├── auth/
│   ├── author/
│   ├── book/
│   ├── common/
│   ├── genre/
│   ├── node_modules/          # Backend dependencies
│   ├── .env                    # Environment variables
│   ├── .gitignore
│   ├── index.js                # Backend entry point
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── .vscode/
│   ├── dist/                   # Production build output
│   ├── node_modules/           # Frontend dependencies
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images, icons, fonts
│   │   ├── components/         # Reusable Vue components
│   │   ├── consts/             # Global constants
│   │   ├── http/               # Axios instances / API configs
│   │   ├── router/             # Vue Router setup
│   │   ├── services/           # API services
│   │   ├── stores/             # Pinia stores
│   │   ├── types/              # TypeScript types/interfaces
│   │   ├── utils/              # Helper functions
│   │   ├── views/              # Page-level Vue components
│   │   ├── App.vue             # Root component
│   │   └── main.ts             # Frontend entry point
│   │
│   ├── .editorconfig
│   ├── .gitattributes
│   ├── .gitignore
│   ├── .prettierrc.json
│   ├── env.d.ts
│   ├── eslint.config.ts
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
└── .gitignore
```
---

