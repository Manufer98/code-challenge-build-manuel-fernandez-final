# CRUD Project with Laravel Backend and Next.js Frontend

This project is a simple CRUD (Create, Read, Update, Delete) application built with Laravel for the backend and Next.js for the frontend. It allows users to perform CRUD operations on contacts.

## Features
- **User Authentication:** Users can register for an account and log in to access the application.
- **Create:** Users can add new contacts with details like name, email, phone number, address, profile picture.
- **Read:** Users can view all contacts as well as individual contact details.
- **Update:** Users can edit and update existing contact information.
- **Delete:** Users can remove unwanted contacts from the list.

## Video Demo
![pro](https://github.com/Manufer98/code-challenge-build-manuel-fernandez-final/assets/78232447/4caa7b79-bb3b-4df3-9e60-5670dcc4286d)


## Technologies Used

- **Backend:** Laravel, PHP
- **Frontend:** Next.js, React.js, JavaScript, CSS
- **Database:** MySQL
- **Mapbox API:** For address suggestions and geocoding.
- **Firebase:** Tool to upload the profile picture.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [Composer](https://getcomposer.org/) installed on your machine
- [Laravel](https://laravel.com/docs/8.x/installation) installed on your machine
- [Next.js](https://nextjs.org/docs/getting-started) installed on your machine

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Manufer98/code-challenge-build-manuel-fernandez-final.git
   
2. Navigate to the project directory
    ```sh
    cd code-challenge-build-manuel-fernandez

3. Install backend dependencies
     ```sh
     composer install

4. Install frontend dependencies
     ```sh
      npm install

5. Run migrations to set up the database schema
    ```sh
      php artisan migrate

6. Start the Laravel server
    ```sh
    php artisan serve

7. Start the Next.js development server
    ```sh
   npm run dev

8. Open your browser and visit http://localhost:3000 to view the application.
