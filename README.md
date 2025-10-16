# React Native Auth App

A simple React Native authentication application built with Expo. It demonstrates a clean architecture using Feature-Sliced Design (FSD), providing a solid foundation for scalable mobile applications.

## Features

- User authentication (login with username/password)
- View user profile information
- Token-based session management with `expo-secure-store`
- Centralized server state management with `React Query`
- Internationalization with `i18next`
- Modern project structure based on **Feature-Sliced Design**

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or Yarn
- Expo Go app on your mobile device or an emulator/simulator setup.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd test_auth_app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
    The `.env.example` already contains the correct API URL for this project.

### Running the Application

- **To run on iOS:**
  ```bash
  npm run ios
  ```

- **To run on Android:**
  ```bash
  npm run android
  ```

- **To start the development server:**
  ```bash
  npm start
  ```
  This will show a QR code that you can scan with the Expo Go app.

## Project Structure

This project follows the **Feature-Sliced Design (FSD)** methodology, which organizes code by business domains rather than technical types. This makes the codebase scalable, maintainable, and easy to navigate.

The main layers are:

-   **/application**: The top-most layer that initializes the app, including providers, routing, and global styles.
-   **/processes**: Handles business processes that span multiple pages (e.g., the authentication flow).
-   **/pages**: The screens of the application (e.g., Login Screen, Profile Screen). They are composed of features and entities.
-   **/features**: User-facing functionality, like the Login Form (`auth_by_username`) or the Logout Button.
-   **/entities**: Business entities, such as `User`. This layer includes the entity's data, model, and UI components.
-   **/shared**: The lowest layer containing reusable code that is not tied to business logic, such as the UI kit, API client setup, and configuration files.
