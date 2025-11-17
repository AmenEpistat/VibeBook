### 🎧 VibeBook — Book Recommendation System

**VibeBook** is a web application that recommends books to users based on their preferences (survey) and selected genres.
The frontend is built with **Vue**, the server is **Node.js + Express**, data is stored in **MongoDB**, and the recommendation logic is implemented using a **ML model prototype** (content-based filtering + learnable preference model).

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

