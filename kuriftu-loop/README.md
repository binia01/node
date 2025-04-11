# Kuriftu Loop

Kuriftu Loop is a mobile-first Progressive Web App (PWA) designed for loyalty, feedback, and discovery at Kuriftu Resorts. This application allows users to register, log in, explore activities, redeem points, and provide feedback, enhancing their overall experience at the resorts.

## Project Structure

The project is organized as follows:

```
kuriftu-loop
├── public
│   ├── index.html          # Main HTML file for the application
│   └── favicon.ico         # Favicon for the application
├── src
│   ├── components          # Reusable components
│   │   ├── Header.jsx      # Navigation header component
│   │   ├── Footer.jsx      # Footer component
│   │   └── Button.jsx      # Reusable button component
│   ├── pages               # Page components
│   │   ├── HomePage.jsx    # Landing page component
│   │   ├── SignupPage.jsx  # User registration component
│   │   ├── LoginPage.jsx    # User login component
│   │   ├── DashboardPage.jsx # User dashboard component
│   │   ├── ExploreActivitiesPage.jsx # Activities exploration component
│   │   ├── QRCodeRedeemPage.jsx # QR code redemption component
│   │   └── FeedbackFormPage.jsx # User feedback collection component
│   ├── firebase.js         # Firebase initialization and configuration
│   ├── App.jsx             # Main application component with routing
│   ├── index.jsx           # Entry point of the React application
│   └── styles              # Global styles
│       └── index.css       # TailwindCSS imports and global styles
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

## Getting Started

To get started with the Kuriftu Loop project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd kuriftu-loop
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project and configure authentication and Firestore.
   - Update the `src/firebase.js` file with your Firebase configuration.

4. **Run the application:**
   ```
   npm start
   ```
   This will start the development server and open the application in your default web browser.

## Features

- User registration and login using email and password.
- Dashboard displaying user points and tier.
- Exploration of activities available at Kuriftu Resorts.
- QR code redemption for loyalty points.
- Feedback form for user suggestions and experiences.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.