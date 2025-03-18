

# 📌 EMV Card Management System

## 🚀 Project Overview

This project is an **EMV Card Management System** that allows users to **add, view, and update** card details. Users can filter cards by **batch number** and **date** and update attributes dynamically.

---

## 🛠️ Tech Stack

### **Frontend:**

- ⚡ **React.js (Vite)**
- 🎨 **CSS** for styling
- 🔄 **Axios** for API calls

### **Backend:**

- 🐍 **Python Flask** (REST API)
- 🗄️ **PostgreSQL** (Database)

---

## ✨ Features

✅ Add EMV card details  
✅ View cards by **batch and date**  
✅ Expand cards to show **detailed information** (from 3 tables)  
✅ Edit & update card attributes dynamically  
✅ Secure **data validation** on backend  
✅ Responsive UI

---

## 📂 Project Structure
```

EMV-Card-Management/
│── frontend/ # React (Vite) frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── AddCard.jsx # Form to add card
│ │ │ ├── ShowDetails.jsx # Fetch & update card details
│ │ │ ├── CardList.jsx # Display list of cards
│ │ ├── App.js
│ │ ├── main.jsx
│ ├── public/
│ ├── package.json
│── backend/ # Flask backend
│ ├── app.py # Main Flask app
│ ├── database.py # PostgreSQL connection
│ ├── models.py # DB Schema (SQLAlchemy)
│ ├── routes.py # API routes
│ ├── requirements.txt
│── README.md
│── .gitignore

````

---

## ⚡ Installation & Setup
### 🔹 Clone the Repository
```bash
git clone https://github.com/your-username/emv-card-management.git
cd emv-card-management
````

### 🔹 Setup Backend (Flask)

1️⃣ Create a **virtual environment**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

2️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

3️⃣ Set up **PostgreSQL** database in `database.py`

```python
conn = psycopg2.connect(
    database="emv_card_db",
    user="your_username",
    password="your_password",
    host="localhost",
    port="5432"
)
```

4️⃣ Run Flask API

```bash
python app.py
```

---

### 🔹 Setup Frontend (React Vite)

1️⃣ Go to frontend directory

```bash
cd frontend
```

2️⃣ Install dependencies

```bash
npm install
```

3️⃣ Start the React server

```bash
npm run dev
```

---



## 📷 Screenshots

### 1. Dashboard View
![Dashboard](./screenshots/Main_page.jpg)

### 2. Add Details View
![Add Details 1](./screenshots/Add.jpg)

![Add details 2](./screenshots/Add2.jpg)

### 3. Show Details View
![Show](./screenshots/Show.jpg)

### 4. P3 View
![Show](./screenshots/P3.jpg)

---

## 🛠️ Future Enhancements

✅ User Authentication (Login & Roles)  
✅ CSV Export of Card Details  
✅ Admin Dashboard for Batch Monitoring

---

## 📝 License

This project is **MIT Licensed**. Feel free to contribute! 😊

---

### 🌟 Star this Repo on GitHub!

If you found this useful, please **⭐ star** the repo and contribute!

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

🔗 [GitHub Repository](https://github.com/your-username/emv-card-management)

```

---

### **Next Steps:**
1️⃣ Replace `"your-username"` with your actual GitHub username.
2️⃣ Upload this `README.md` to your GitHub repository.

Would you like any other formatting changes? 😊🚀
```
