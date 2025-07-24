# Chaté a me
A conversational Spanish chatbot for learners of all levels


## Overview
Chaté a me is a web-based chatbot designed to help users practise Spanish conversation in a natural, interactive way. Users can select their language proficiency level (from A1 to C2) and engage in written dialogue with an AI that mimics a native Spanish speaker. The app is designed to complement traditional language learning tools by offering a space to practise real-life webchat conversations.


## Features
- Conversational Chat Interface – Styled like WhatsApp for familiarity and ease of use.
- Grammar Correction – The chatbot corrects your Spanish input before replying, helping you learn from mistakes.
- Level Selection – Choose your Spanish level (A1–C2) to tailor the complexity of the conversation.
- Dictionary – User can translate unfamiliar words or look up new ones without leaving the app.
- Topic Vocabulary Builder – Enter a topic and receive 5 useful Spanish words with English translations to boost fluency.
- All-in-One Practice – Everything you need to stay in the flow of conversation is built into the interface.


## Tech Stack

### Frontend

- Next.js (React framework)
- React, JavaScript
- HTML & CSS

### Backend / API

- OpenAI API (GPT-3.5-Turbo via REST)

### Runtime & Package Management

- Node.js
- NPM
 
### Environment Management

- .env files for API keys and secrets

### Deployment

- Vercel

### CI/CD & Version Control

- GitHub Actions
- Git & GitHub


## Demo
https://github.com/user-attachments/assets/68175c9e-69ad-44c0-bae5-07bcbd75fbae


## Installation & Setup
### To run the app locally:
1. Clone the repository
```
https://github.com/Albert-S2/chateame.git
cd chate-a-me
```
2. Install dependencies
```
npm install
```
3. Create a .env.local file in the root directory and add the following:
```
OPENAI_API_KEY=your_openai_key_here
NEXT_PUBLIC_USERNAME=your_login
NEXT_PUBLIC_PASSWORD=your_password
```
4. Run the development server
```
npm run dev
```
5. Open http://localhost:3000 in your browser to use the app.



## Configuration
OpenAI API Key – Required for chatbot functionality.
Login Secret – Used to manage user sessions securely (stored in .env.local).
