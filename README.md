# 🕵️ Crime Management System

A comprehensive **Crime Management System** designed to streamline law enforcement operations, officer management, case tracking, victim handling, incident reporting, and advanced authentication with face recognition. Built with **Java, Spring Boot, MySQL, and modern frontend technologies**, this project integrates multiple modules for secure and efficient crime data management.

---

## 📌 Features

### 🔐 Module 1 — User Registration & Authentication
- User registration with roles (Admin / Officer)
- Secure login with password hashing (SHA-256 / BCrypt)
- Session management and logout

### 🔑 Module 2 — Advanced Authentication
- Two-Factor Authentication (OTP via Email/SMS)
- Role-Based Access Control (RBAC)
- Session monitoring (login time, IP, activity logs)

### 👤 Module 3 — Face Recognition System
- Criminal face enrollment (OpenCV / JavaCV / Python API)
- Live face detection & recognition
- Facial search from uploaded images

### 📊 Module 4 — Admin Dashboard
- Total officers, criminals, cases
- Pending investigations
- Face recognition alerts

### 👮 Module 5 — Officer Management
- Add, update, delete officers
- View officer list

### 🧑‍🦹 Module 6 — Criminal Information Management
- Add, update, delete criminals
- Capture face images
- Search criminal records

### 📂 Module 7 — Case / FIR Management
- Register case/FIR
- Assign officer
- Update case status
- Add evidence
- Link suspects via face recognition

### 🧑‍🤝‍🧑 Module 8 — Victim Management
- Add victims
- Link victims to cases
- View victim list

### 🚨 Module 9 — Incident Reporting
- Report incidents (public/officer)
- Update incidents
- View incident list

### 🔍 Module 10 — Search & Reports
- Search cases, criminals, officers
- Generate crime statistics
- Year-wise reports
- Crime heat map (optional)

### 🌐 Module 11 — Website Frontend
- User pages: login, registration, OTP verification
- Admin pages: dashboard, manage officers/cases/criminals
- Face recognition pages: capture, search, live recognition
- General pages: report crime, search case, contact

### ⚙️ Module 12 — Backend Servlets
- Authentication, officer, criminal, case/FIR, face recognition, reports

---

## 🛠️ Tech Stack

- **Backend:** Java, Spring Boot, Servlets
- **Frontend:** HTML, CSS, JavaScript
- **Database:** MySQL
- **Face Recognition:** OpenCV, JavaCV, Python API
- **Authentication:** BCrypt / SHA-256, OTP (Email/SMS)
- **Version Control:** Git & GitHub

---

## 🗄️ Database Schema (MySQL)

Tables:
- `users` — login credentials & roles
- `officers` — officer details
- `criminals` — criminal records
- `criminal_faces` — face encodings/images
- `cases` — FIRs & case details
- `victims` — victim records
- `incidents` — incident reports
- `evidence` — case evidence
- `login_logs` — session tracking
- `otp_codes` — 2FA codes
- `recognition_logs` — face recognition attempts

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven
- MySQL
- Git

### Setup
```bash
# Clone repository
git clone https://github.com/ashishchauhan1234/Crime_mamagement.git

# Navigate to project
cd Crime_mamagement/backend/case

# Build project
mvn clean install

# Run application
mvn spring-boot:run
