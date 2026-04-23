# 🚀 D2C Brand Onboarding & Tracking System

## 📌 Project Overview
This project is a backend system designed to manage D2C (Direct-to-Consumer) brand onboarding and evaluation.

It helps internal teams to:
- Review incoming brand applications
- Track evaluation progress
- Add internal notes
- Monitor overall pipeline status

---

## ⚙️ Tech Stack
- Node.js
- Express.js
- MySQL
- Sequelize ORM

---

## 🏗️ Architecture
This project follows a clean MVC architecture:

- controllers/ → Handles API logic
- models/ → Database schema
- routes/ → API endpoints
- services/ → Business logic (status transitions)
- config/ → Database configuration

---

## 📦 Features

### 🟢 Brand Management
- Create a new brand
- Get all brands
- Filter by status and category
- Pagination support

---

### 🔄 Status Workflow (Core Feature)
The system enforces strict status transitions:

SUBMITTED → UNDER_REVIEW → SHORTLISTED → ACCEPTED / REJECTED

Rules:
- ❌ Cannot skip steps
- ❌ Cannot go backward
- ❌ ACCEPTED and REJECTED are final states

---

### 📝 Notes System
- Add notes to a brand
- Each note is linked using a foreign key
- Retrieve notes along with brand details

---

### 📊 Dashboard Summary
- Total number of brands
- Count of brands by each status

---

## 🔗 API Endpoints

### 1. Create Brand
POST /api/brands

Request:

{
"brand_name": "GlowSkin",
"founder_name": "Ankit Sharma",
"category": "Skincare",
"monthly_revenue": 500000
}


---

### 2. Get All Brands
GET /api/brands  
GET /api/brands?status=UNDER_REVIEW  
GET /api/brands?category=Fashion  

---

### 3. Get Single Brand
GET /api/brands/:id  

---

### 4. Update Status
PATCH /api/brands/:id/status  

Request:

{
"status": "UNDER_REVIEW"
}


---

### 5. Add Note
POST /api/brands/:id/notes  

Request:

{
"note": "Strong brand growth"
}


---

### 6. Dashboard Summary
GET /api/brands/summary  

Response:

{
"total": 10,
"submitted": 2,
"under_review": 3,
"shortlisted": 2,
"accepted": 2,
"rejected": 1
}


---

## 🗄️ Database Schema

### brands table
- id (PK)
- brand_name
- founder_name
- category
- monthly_revenue
- website
- status
- createdAt
- updatedAt

---

### notes table
- id (PK)
- brand_id (FK)
- note
- createdAt

---

## ⚠️ Validations
- Required fields validation
- Monthly revenue must be ≥ 0
- Notes cannot be empty
- Status transition rules enforced

---

## ▶️ How to Run the Project

### 1. Install dependencies

npm install


---

### 2. Configure environment variables

Create a `.env` file:


DB_NAME=your_database_name
DB_USER=root
DB_PASS=your_password
DB_HOST=localhost
PORT=5000


---

### 3. Start the server

npm run dev


---

## 🧪 Testing
- APIs tested using Postman
- Edge cases verified:
  - Invalid status transitions
  - Empty notes
  - Negative revenue

---

## 🎯 Key Highlights
- Clean MVC architecture
- Business logic separated in service layer
- Sequelize associations implemented
- Proper validation and error handling

---

## 👨‍💻 Author
Laxmi Navi