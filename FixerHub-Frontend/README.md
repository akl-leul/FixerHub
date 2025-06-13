# FixerHub Frontend

This is the **frontend client** for the FixerHub platform — a service marketplace connecting clients with verified professionals. It’s built using **React Native (Expo)** and interacts with an **Express.js backend** via REST APIs.

## 📱 Key Features

- React Native UI built with Expo
- RESTful API integration with Express backend
- Role-based authentication (Client / Professional)
- Secure login and signup
- Email & OTP verification
- Document upload and AI-powered verification
- Location-aware search (Google Maps)
- In-app messaging and reviews
- AI assistant to guide service selection

## 🛠️ Tech Stack

- React Native (with Expo)
- Express.js (backend API integration)
- Supabase (for auth and database)
- Google Maps API
- OpenAI GPT API
- TypeScript

## ⚙️ Prerequisites

- Node.js (v16+)
- Expo CLI (`npm install -g expo-cli`)
- Supabase account and project 
- Express backend running locally or remotely

## 🚀 Installation

1. **Clone the repo**:

```bash
git clone <your-repo-url>
cd FixerHub-Frontend


FixerHub-Frontend/
├── app/                # Screens and routing
├── hooks/              # custom React hooks
├── contexts/           # Global state (e.g. AuthContext)
├── lib/                # API clients (e.g. Supabase, Axios)
├── utils/              # Helper functions
├── types/              # TypeScript types
├── assets/             # Images and icons
├── .env                # Environment variables
├── app.json            # Expo configuration
└── package.json        # NPM dependencies
