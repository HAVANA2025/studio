# G-Electra Hub - Smart Systems Club Website

Welcome to the official repository for the G-Electra Hub website! This project is a Next.js application built with TypeScript, Tailwind CSS, ShadCN UI components, and Firebase.

## Project Overview

This application serves as the main portal for the G-Electra club, featuring:
- **Dynamic Announcements:** A real-time feed for news and updates, with admin controls.
- **Event Registration:** A system for creating and managing event registrations.
- **Community Showcase:** Pages for the team, mentors, achievements, and projects.
- **Authentication:** Secure login and signup for members using Firebase Authentication.
- **Contact Form:** An email-based contact form powered by Resend.

---

## Getting Started: Running Locally

To run this project on your local machine, please follow these steps.

### 1. Prerequisites

- **Node.js:** Make sure you have Node.js (version 18 or later) installed.
- **Firebase Project:** You will need a Firebase project to connect the application to its backend services. You can create one for free at the [Firebase Console](https://console.firebase.google.com/).
- **Resend Account:** The contact form uses Resend to send emails. You'll need an API key from [Resend](https://resend.com/).

### 2. Clone the Repository

First, clone the project to your local machine.

```bash
git clone <repository-url>
cd <project-directory>
```

### 3. Install Dependencies

Install the necessary `npm` packages for both the main application and the Cloud Functions.

```bash
# Install dependencies for the main Next.js app
npm install

# Install dependencies for the Firebase Functions
cd functions
npm install
cd ..
```

### 4. Configure Environment Variables

The project requires several environment variables for Firebase and Resend integration.

1.  Create a new file named `.env` in the root of the project.
2.  Copy the contents of `.env.example` into your new `.env` file.
3.  Fill in the values for each variable.

```
# .env

# --- Firebase Configuration ---
# You can find these values in your Firebase project settings:
# Go to Project Settings > General > Your apps > Web app > SDK setup and configuration
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"

# --- Resend Configuration ---
# Get this from your Resend account dashboard
RESEND_API_KEY="YOUR_RESEND_API_KEY"
```

### 5. Run the Development Server

Once the dependencies are installed and environment variables are set, you can start the development server.

```bash
npm run dev
```

The application should now be running at `http://localhost:9000`.

---

## File Structure

Here's a brief overview of the key directories in this project:

- **/public**: Contains static assets like images and fonts that are served directly.
- **/src/app**: The main application directory using the Next.js App Router. Each folder represents a route.
- **/src/components**: Contains all the reusable React components.
  - **/src/components/ui**: Auto-generated UI components from ShadCN.
  - **/src/components/layout**: Components for the overall page structure, like the Header and Footer.
- **/src/hooks**: Custom React hooks, such as `useAuth` for handling user authentication state.
- **/src/lib**: Core utility functions and Firebase configuration.
  - `firebase.ts`: Initializes the Firebase app and services.
  - `types.ts`: TypeScript type definitions used across the app.
- **/functions**: Contains the code for Firebase Cloud Functions, such as the `sendWelcomeEmail` trigger.

---

## Important Information

- **Authentication:** The app uses Firebase Authentication (Email/Password, Google, GitHub). User roles (admin vs. student) are managed via a hardcoded list in `src/lib/firebase.ts` and can also be managed in Firestore.
- **Database:** Firestore is used to store announcements and events. Make sure your Firestore security rules are configured correctly.
- **Styling:** The project uses Tailwind CSS for styling and ShadCN for UI components. The main theme colors can be customized in `src/app/globals.css`.
