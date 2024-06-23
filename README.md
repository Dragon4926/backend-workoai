# Worko Backend

## Setup

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd worko-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URI:
    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

4. Run the server:
    ```sh
    npm start
    ```

5. Run tests:
    ```sh
    npm test
    ```

## API Endpoints

- `GET /worko/user` - List users
- `GET /worko/user/:userId` - Get user details
- `POST /worko/user` - Create user
- `PUT /worko/user/:userId` - Update user
- `PATCH /worko/user/:userId` - Update user
- `DELETE /worko/user/:userId` - Soft delete user
