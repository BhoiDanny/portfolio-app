# Portfolio Application

This is a simple portfolio application built with laravel and react.

## Features

- User authentication
- Create, read, update and delete portfolio items
- Responsive design
- Dark mode
- Image upload
- Search functionality

## Technologies Used

- Laravel
- React
- Tailwind CSS
- MySQL

## Installation

1. Clone the repository

    ```bash
    git clone

    ```

2. Navigate to the project directory

    ```bash
    cd portfolio-app
    ```

3. Install the dependencies
    ```bash
    composer install
    npm install
    ```
4. Create a `.env` file and set up your database connection
    ```bash
    cp .env.example .env
    ```
5. Generate an application key
    ```bash
    php artisan key:generate
    ```
6. Run the migrations
    ```bash
    php artisan migrate
    ```
7. Seed the database (optional)
    ```bash
    php artisan db:seed
    ```
8. Start the development server
    ```bash
    php artisan serve
    ```
9. In a new terminal, start the React development server
    ```bash
    npm start
    ```
10. Open your browser and navigate to `http://localhost:3000` to view the application.
11. Open your browser and navigate to `http://localhost:8000` to view the API documentation.

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request. All contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Laravel](https://laravel.com/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MySQL](https://www.mysql.com/)

## Author

- [Daniel Botchway](https://github.com/BhoiDanny)
- [LinkedIn](https://www.linkedin.com/in/daniel-botchway/)

## Screenshots

### Projects Page
![Projects Page](screenshots/Screenshot%202025-05-02%20013734.png)

### Skills Management Page
![Skills Management](screenshots/Screenshot%202025-05-02%20013807.png)

### Settings Page
![Settings Page](screenshots/Screenshot%202025-05-02%20013915.png)