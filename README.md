# 🔐 Advanced Authentication System

A secure and scalable authentication system built with **Node.js, Express.js, MongoDB, and JWT**.

This project implements modern authentication and session-management features including **Access Tokens, Refresh Tokens, Refresh Token Rotation, OTP-based Verification, and Multi-Device Session Management**.

## 🚀 Features

- 👤 User Registration
- 🔑 User Login
- 🔐 JWT-based Authentication
- 🎫 Access Token
- ♻️ Refresh Token
- 🔄 Refresh Token Rotation
- 📧 OTP-based User Verification
- 🛡️ Protected Routes
- 🚪 Logout
- 📱 Logout from Specific Device
- 🌐 Logout from All Devices
- 🔄 Access Token Renewal
- 👥 Multi-Device Session Management
- ⏳ Token Expiration Handling
- 🗄️ MongoDB Database Integration

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)**
- **JavaScript**
- **Nodemailer** *(if used for OTP/email verification)*

## 🔐 Authentication Flow

```text
User
  ↓
Register / Login
  ↓
OTP Verification
  ↓
Access Token + Refresh Token
  ↓
Access Protected APIs
  ↓
Access Token Expires
  ↓
Refresh Token
  ↓
New Access Token
  ↓
Refresh Token Rotation