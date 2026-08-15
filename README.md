# 🎓 Vishwakarma Institute of Technology (VIT) - Enterprise Semester Academic & ERP System

An enterprise-grade, full-stack Academic Management & Multi-Semester ERP System designed for Students, Faculty, and Institutional Administrators.

---

## 🌟 Key Features

### 1. 📊 Multi-Semester Academic Gradebook & Results Engine
- **Multi-Semester Switcher**: Full historical review across Semesters 1 through 8.
- **Comprehensive Grade Evaluation**: Automatic MSE (30%), ESE (70%), and Lab/Practical weighting with dynamic SGPA, cumulative CGPA progression, and backlog/KT tracking.
- **Printable Official Grade Sheet**: Authentic institutional transcript with university seal, Controller of Examinations signature area, and 1-click **Print / PDF Download**.

### 2. 📋 Subject-wise Attendance & Defaulters Radar
- **Attendance Monitoring**: Subject-by-subject percentage calculation and session breakdown.
- **Defaulter Warning System**: Automated alert badges for students with aggregate attendance < 75%.
- **Live Classroom Attendance Logger**: Faculty batch-logging tool with 1-click "Mark All Present" and quick Absent toggles.

### 3. 🎫 Digital Examination & Hall Ticket Module
- **Admit Card Issuance**: Features candidate PRN, exam timetable with assigned room blocks, and rules.
- **Automatic Eligibility Check**: Verifies fee clearance and &ge; 75% attendance before releasing hall tickets.

### 4. 💳 Fees, Invoices & Digital Receipts
- **Tuition & Exam Breakdown**: Detailed fee invoices with transaction IDs and clearance verification.
- **Downloadable Fee Receipts**: Print-ready official payment vouchers.

### 5. 📢 Official Circulars & Notices Hub
- Categorized announcements (**Academic**, **Exam**, **Circular**, **Placement**, **Events**) with priority badges.

### 6. 🛠️ Institutional Administration Master Panel
- **User Directory (CRUD)**: Manage student PRNs, faculty staff, and admin accounts.
- **Curriculum & Syllabus Builder**: Configure courses and credits across all 8 semesters.
- **Notice Publisher**: Broadcast college-wide circulars.

---

## 💻 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Heroicons
- **Backend**: Node.js, Express.js, Sequelize ORM
- **Database**: SQLite (Zero-config, embedded, portable)
- **Security**: JWT Authentication, Role-Based Access Control (RBAC), bcrypt password hashing

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/abhijeetnardele24-hash/VIT-Semester-Result-Module.git
cd VIT-Semester-Result-Module
```

### 2. Backend Setup
```bash
cd backend-node
npm install
node seed.js    # Pre-seeds 37 courses, 10 realistic students, marks, attendance, and notices
npm start       # Starts backend server on http://localhost:8080
```

### 3. Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
npm run dev     # Starts Vite dev server on http://localhost:5173
```

---

## 🔑 Demo Credentials

| Role | Username / PRN | Password | Description |
| :--- | :--- | :--- | :--- |
| **Student** | `23BCE0001` | `password123` | Aarav Sharma (Sem 6, CGPA: 9.15) |
| **Student** | `23BCE0002` | `password123` | Ananya Iyer (Sem 6, CGPA: 9.42) |
| **Faculty** | `FACULTY01` | `password123` | Dr. Rajesh Rao (HOD, Computer Engineering) |
| **Admin** | `ADMIN01` | `password123` | Prof. Vikramaditya Shinde (Dean of Academics) |

---

## 📄 License
This project is licensed under the MIT License.
