# Laravel VueJS Firebase CMS

## Overview
This project is a basic CMS (Content Management System) that uses Laravel for the backend and VueJS for the frontend. It utilizes Firebase for authentication, Firestore for the database, and Firebase Hosting for deployment.

## Features
- User Authentication (Login, Registration, Password Recovery (Not done yet))
- Admin Page (Not really done yet)
- User Management Page (Not done yet)
- Public Pages Creation (Not done yet)

## Technologies Used
- Laravel (Backend) (Not done yet)
- VueJS (Frontend)
- Firebase Authentication
- Firestore (Database)
- Firebase Hosting
- Firebase Functions (Not done yet)

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js installed 
  - Download and Install Node.js: Go to the official Node.js website and download the installer for your operating system (Windows, macOS, or Linux). Follow the installation instructions. 
  - Verify Node.js and npm installation:
  ````bash
  node -v
  npm -v
  ````
  - These commands should display the installed versions of Node.js and npm.
- Composer installed
  - Download and Install Composer: Go to the official Composer website and download the installer for your operating system (Windows, macOS, or Linux). Follow the installation instructions.
  - Verify Composer installation:
  ````bash
    composer -v
    ````
    - This command should display the installed version of Composer.
- Firebase CLI installed
  - Install the Firebase CLI: Run the following command to install the Firebase CLI:
  ````bash
    npm install -g firebase-tools
    ````
    - Verify Firebase CLI installation:
    ````bash
    firebase --version
    ````
    - This command should display the installed version of the Firebase CLI.
- Firebase Project
  - Create a Firebase Project: Go to the Firebase Console and create a new project.
  - Add Firebase to your Web App: Click on the Web icon to add Firebase to your web app. Copy the Firebase configuration object.
  - Enable Firebase Authentication: Go to the Authentication section in the Firebase Console and enable the authentication methods you want to use.
  - Enable Firestore Database: Go to the Firestore Database section in the Firebase Console and create a new Firestore database.
  - Enable Firebase Hosting: Go to the Hosting section in the Firebase Console and set up Firebase Hosting for your project.

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/FaaasJungler/BasicCMS-Vue.git
cd BasicCMS-Vue
```
    
### 2.Setting up the project
Install dependencies:

````bash
Copy code
npm install
````

### 3. Firebase Configuration

Copy the .env.temp file to .env and fill in your Firebase configuration:
````bash
cp .env.temp .env
````

## Working with the Application
### Running the Frontend
Start the VueJS development server:

````bash
npm run dev
````

### Building the Frontend
When ready to deploy, build the VueJS application:

````bash
npm run build
````

### Deploying to Firebase
From the root directory, deploy your application:

````bash
firebase deploy
````

## File Structure
````
BasicCMS-Vue/
├── public/
│   └── assets/
│       └── images/
│           └── vite.svg
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── vue.svg
│   │   └── styles/
│   │       ├── Footer.scss
│   │       ├── Home.scss
│   │       ├── Login.scss
│   │       ├── Modal.scss
│   │       ├── Navbar.scss
│   │       ├── Register.scss
│   │       ├── styles.scss
│   │       └── variables.scss
│   ├── components/
│   │   ├── Admin.vue
│   │   ├── Footer.vue
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── Modal.vue
│   │   ├── Navbar.vue
│   │   ├── PasswordRecovery.vue
│   │   └── Register.vue
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   ├── index.js
│   │   └── userStore.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── .babelrc
├── .env
├── .env.temp
├── .firebaserc
├── .gitignore
├── firebase.json
├── firebase-config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
````

## Contributing
- Fork the project
- Create your feature branch (git checkout -b feature/AmazingFeature)
- Commit your changes (git commit -m 'Add some AmazingFeature')
- Push to the branch (git push origin feature/AmazingFeature)
- Open a Pull Request

## License
- Distributed under the MIT License. See LICENSE for more information.

## Contact
Mathieu Castonguay - mathcas3194@gmail.com

Project Link: https://github.com/FaaasJungler/BasicCMS-Vue