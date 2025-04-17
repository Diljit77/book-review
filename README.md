#  Book Review Platform – MERN Stack
This is a full-stack Book Review Platform built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
Users can browse books, search, filter, add reviews, and view book details. Admins can manage books, and users can view their submitted reviews via a profile page.

---

## 🚀 Features

- Browse and filter books by rating, price, and author
- Smart live search with instant suggestions
-  View and submit reviews for books
-  User profile with personal review history

---

## 📦 Tech Stack

- **Frontend:** React.js + TailwindCSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB with Mongoose

---

## 🛠 Setup Instructions

### 📁 Clone the Repo

```bash
git clone https://github.com/Diljit77/book-review.git
cd book-review
```

---

### ⚙️ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_DB_ATLAS=your_mongodb_connection_string
```

Run the server:

```bash
node server.js or nodemon
```

---

### 💻 Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🌐 Live Demo (if hosted)

https://book-review-taupe.vercel.app/

---

## 📌 Notes

- You must have MongoDB Atlas or local MongoDB running
- Ensure the backend and frontend run on different ports (`5000` & `5173`)
- Update API URLs if using a hosted backend

---

