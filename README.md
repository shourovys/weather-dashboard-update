# Weather Dashboard

A simple web application that integrates both public and private APIs using OAuth2.0 for authentication and authorization. Users can view weather data for any city, authenticate using a third-party OAuth provider, and save their favorite cities to a Firestore database.

## Features

- **Public Weather API Access**: Users can search and view the weather for any city.
- **OAuth2.0 Authentication**: Users can sign in using a third-party provider (Google & GitHub).
- **Firestore Integration**: Authenticated users can save their favorite cities and view their current weather.
- **Responsive Design**: The application is fully responsive for both desktop and mobile devices.
- **Error Handling**: Graceful handling of API errors and token expiration.

---

## Table of Contents

1. [Demo](#demo)
2. [Tech Stack](#tech-stack)
3. [Setup Instructions](#setup-instructions)
   - [Frontend](#frontend-setup)
   - [Backend (Firestore)](#backend-firestore-setup)
4. [How to Use](#how-to-use)
5. [Assumptions and Decisions](#assumptions-and-decisions)
6. [License](#license)

---

## Demo

Here’s a link to the live demo (if hosted).

[Live Demo](https://weather-dashboard-by-shourov.vercel.app/)

---

## Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Context API**: For global state management.
- **Firebase Authentication**: OAuth2.0 implementation using Google/GitHub.
- **OpenWeatherMap API**: Fetches public weather data for cities.
- **Tailwind CSS**: For styling and responsive design.
- **Firebase Firestore**: Cloud-based NoSQL database to store and retrieve user’s favorite cities.

### Backend

- **Proxy Backend**: Node Express custom backend to handel sensitive credentials.

---

## Setup Instructions

### Frontend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/shourovys/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**

   ```bash
   yarn
   ```

3. **Set up environment variables**

   Create a `.env` file at the root of the project with the `.env.example` keys:

4. **Start the development server**

   ```bash
   yarn dev
   ```

   The app should now be running at `http://localhost:5173`.

### Backend Setup

1. **Clone the backend repository**

   ```bash
   git clone https://github.com/shourovys/weather-dashboard-backend.git
   cd weather-dashboard-backend
   ```

2. **Install dependencies**

   ```bash
   yarn
   ```

3. **Set up environment variables**

   Create a `.env` file at the root of the project with the `.env.example` keys:

4. **Start the development server**

   ```bash
   yarn dev
   ```

### Assumptions and Decisions Made:

1. **Location Service**: I used a third-party paid service to fetch and suggest city locations for users to select from when searching for weather data.
2. **Proxy Backend for Security**: To manage sensitive authentication credentials, I implemented a proxy backend. This ensures that sensitive information, such as GITHUB_CLIENT_SECRET, is securely handled on the server side and not exposed in the frontend. also use for verify access token.
3. **TypeScript for Type Safety**: The project was built using TypeScript to ensure type safety, reduce bugs, and improve maintainability.
4. **Context API for State Management**: The Context API was implemented in a scalable and maintainable manner to handle global state, particularly authentication and weather data.
5. **Reusable Component Architecture**: The application was designed with reusable component-based architecture to support scalability and ensure efficient code reuse.
6. **Organized Code Structure**: I followed an organized code structure and file/folder organization to make the project easier to maintain and scale.
7. **User-Friendly Interface**: The UI was built to be intuitive and user-friendly, providing smooth transitions between components and sections of the application.
8. **Visual Feedback for Users**: Visual feedback was implemented to inform users about the status of actions being performed, enhancing the overall user experience.

---

### Handling OAuth2.0, API Interactions, and Firestore Integration:

**OAuth2.0 Handling**:
To handle OAuth2.0 authentication, I integrated a third-party OAuth provider (e.g., Google & GitHub). Once the user logs in and receives an access token or code, I forward this token/code to a proxy backend for further processing. The proxy backend is responsible for securely fetching user information using the access token, and it also stores the refresh token in an HTTP-only cookie for security purposes. also validate the access token of user and create refresh token on access token expiration.
On the frontend, I used Context API to manage authentication across the entire application. Whenever the user refreshes the page or revisits the site, an API call is made to validate the access token. If the access token has expired, the backend automatically uses the refresh token form http-only-cookie to issue a new access token, ensuring a seamless experience for the user.

**API Interactions**:
For interacting with external APIs, such as the weather API, I created reusable custom functions with proper error handling to ensure robust communication with third-party services. The custom utility functions were designed to handle different HTTP methods (GET, POST, DELETE) while providing consistent error handling and response management. Additionally, I created custom hooks in React to manage API calls in a more declarative and reusable way throughout the application. Also I setup swr proper configuration for salability.

**Firestore Integration**:
I integrated Google Firestore into the application to store and retrieve user data, such as favorite cities. Custom service functions with proper type safety were created to handle the Firestore interactions, allowing for easy retrieval and saving of data.
