# 🛒 POS Inventory Management API (MERN Stack)

**IT4020 - Modern Topics in IT | Assignment 1: Generative AI in Software Engineering**

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![ChatGPT](https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

## 📌 Project Overview
This repository contains a RESTful backend API for a Point of Sale (POS) Inventory System. It was developed as part of an academic evaluation to practically compare the performance, reasoning, and code-generation capabilities of two leading Generative AI tools: **OpenAI's ChatGPT** and **Google's Gemini**.

The project demonstrates the end-to-end software development lifecycle utilizing AI assistance, heavily emphasizing the necessity of **human-in-the-loop validation** for security, architecture, and debugging.

## 🚀 Technical Features & Manual Improvements
While the foundational CRUD logic was generated via AI prompts, several critical manual interventions were implemented to ensure the application met production-level standards:

* **Robust Database Architecture:** Implemented fail-fast connection logic and environment variable (`.env`) validation to prevent silent server failures.
* **Security Hardening:** Integrated `helmet` to secure HTTP headers and hide server identity, alongside `express-rate-limit` to protect the API against brute-force and DDoS attacks.
* **Data Integrity & Sanitization:** Added strict input validation, `.trim()` sanitization, and Title Case formatting within the controllers to maintain clean database records.
* **Advanced Error Handling:** Debugged a critical flaw in the AI-generated `DELETE` route by implementing `mongoose.Types.ObjectId.isValid()` to prevent fatal `CastError` server crashes when handling malformed request IDs.

## 🤖 AI Comparative Evaluation Summary
As part of the assignment deliverables, ChatGPT and Gemini were rigorously evaluated against several criteria:

1. **Output Quality & Architecture:** ChatGPT excelled in generating modular, decoupled code (separating routes, controllers, and DB logic), whereas Gemini favored highly compressed, single-file outputs suitable only for rapid prototyping.
2. **Prompt Sensitivity:** ChatGPT demonstrated high adaptability to role-based prompting ("Act as a senior backend engineer"), autonomously introducing structured error handling. Gemini required more explicit, iterative prompting to achieve the same structural depth.
3. **Debugging Capabilities:** Both tools successfully diagnosed the `DELETE` route crash. However, ChatGPT provided a superior developer experience by explaining the underlying database driver limitations and implementing layered validation logic with clear commentary.

**Verdict:** ChatGPT served as a highly capable architectural assistant for end-to-end development, while Gemini proved effective for high-speed, localized code execution.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/MTIT-Assignment01-CRUD-APP.git](https://github.com/yourusername/MTIT-Assignment01-CRUD-APP.git)
   cd MTIT-Assignment01-CRUD-APP

2. **Install dependencies:**
   ```bash
   npm install

3. **Environment Variables:**
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string

4. **Start the server:**
   ```bash
   # For development with nodemon
   npm run dev
   # For production
   npm start
