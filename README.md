# 📚 Flashcard App Frontend

A simple and intuitive flashcard application built with **React, TypeScript, and Material UI**, designed to help users create, manage, and study flashcards efficiently. This repository contains the frontend code, which interacts with a Django REST API backend.

🚀 **Live Demo:** [https://flashcard-app-lorem-digital.vercel.app/](https://flashcard-app-lorem-digital.vercel.app/)

---

## ✨ Features

✅ **User Authentication** – Sign up, log in, and manage sessions using JWT authentication.

✅ **Create & Manage Flashcards** – Users can create decks, add flashcards, edit them, and delete them.

✅ **Study Mode** – Flip through flashcards and mark answers as correct or incorrect, with progress tracking.

✅ **Modern UI** – Built with **Material UI (MUI)** for a polished and responsive experience.

✅ **Rate Limiting Protection** – Prevents abuse by implementing API request limits.

✅ **Deployed on Vercel** – Optimized for performance and seamless updates.

---

## 🛠️ Technologies Used

- **Frontend:** React, TypeScript, Vite, Material UI (MUI)

- **State Management:** React Context API

- **API Calls:** Axios

- **Authentication:** JSON Web Tokens (JWT)

- **Routing:** React Router

- **Deployment:** Vercel

---

## 🚀 Getting Started

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/carter-loremdigital/flashcard-app-frontend
cd flashcard-app-frontend
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the root directory and add the following variables:

```
VITE_API_URL=http://127.0.0.1:8000/api
VITE_CANONICAL_URL=http://localhost:5173
```

### **4️⃣ Run the Development Server**

```sh
npm run dev
```

Then, open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔧 Project Structure

```
flashcard-app-frontend/
│── src/
│ ├── api/ # API clients (Axios)
│ ├── components/ # Reusable UI components
│ ├── context/ # Global state (Auth, Decks, etc.)
│ ├── pages/ # Page components (Login, Signup, Decks, etc.)
│ ├── utils/ # Utility functions
│ ├── App.tsx # Main React component
│ ├── main.tsx # Entry point
│── public/ # Static assets
│── .env # Environment variables (Create this file and add your variables)
│── README.md # Project documentation
│── package.json # Dependencies & scripts
```

---

## 🌐 Deployment

This project is deployed using **Vercel**.

### Deploying on Vercel

1. **Fork this repository** and push your changes to GitHub.

2. Go to [Vercel](https://vercel.com/) and create a new project.

3. Connect your GitHub repository and deploy.

4. Set up your environment variables in Vercel's settings.

---

## 🔗 Related Repositories

- **Backend Repository**: [Flashcard App Backend](https://github.com/carter-loremdigital/flashcard-app-backend)

---

## 📝 License

This project is licensed under the **MIT License**.
