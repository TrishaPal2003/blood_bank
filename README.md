# 🩸 Blood Bank — Fullstack Web App (Django + React + Tailwind)

A fullstack donation management system built with **Django REST Framework** and **React** that allows users to request, donate, and track blood donations. Designed for real-world scalability, security, and performance.

---

## 🚀 Features

### 👤 Authentication
- Email verification for sign up (Django signals + token system)
- Login/logout (DRF + JWT or session-based)

### 🩸 Donor Management
- Donor profile: name, age, blood group, address, last donation date
- Availability toggle for donation status
- Donation history tracker (who, when, where)

### 📬 Blood Requests
- Authenticated users can post emergency blood requests
- Requests visible to all donors (like a social feed)
- Notification system to donors who match blood group

### 🧭 Search & Dashboard
- Search donors by blood group and location
- View request feed and donation history in dashboard

---

## 🛠️ Tech Stack

| Layer         | Stack                             |
|---------------|-----------------------------------|
| Frontend      | React, Tailwind CSS, Vite         |
| Backend       | Django, Django REST Framework     |
| Database      | SQLite (dev) → PostgreSQL (prod)  |
| Testing       | `unittest` (Django `TestCase`)    |
| Versioning    | Git, GitHub                       |

---

## 🗂️ Project Structure

