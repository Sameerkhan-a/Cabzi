# API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user. It validates the input data, hashes the password, and creates a new user in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the user details.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following structure:
```json
{
  "fullname": {
    "firstname": "string (min length: 3, required)",
    "lastname": "string (min length: 3, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min length: 6, required)"
}
```

### Response

#### Success (201 Created)
```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string (optional)"
  }
}
```

#### Error (400 Bad Request)
Occurs when validation fails or required fields are missing.
```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (field name)",
      "location": "string (body)"
    }
  ]
}
```

---

## Endpoint: `/users/login`

### Description
This endpoint is used to authenticate an existing user. It validates the input data, checks the email and password, and returns a JSON Web Token (JWT) and the user details upon successful authentication.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following structure:
```json
{
  "email": "string (valid email format, required)",
  "password": "string (min length: 6, required)"
}
```

### Response

#### Success (200 OK)
```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string (optional)"
  }
}
```

#### Error (400 Bad Request)
Occurs when validation fails or required fields are missing.
```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (field name)",
      "location": "string (body)"
    }
  ]
}
```

#### Error (401 Unauthorized)
Occurs when the email or password is incorrect.
```json
{
  "message": "Invalid email or password"
}
```

### Example Request
```bash
curl -X POST http://localhost:5000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Example Response (Success)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8c2e5b5d6c9a1b2e3f4g5",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

---

## Endpoint: `/users/profile`

### Description
This endpoint is used to retrieve the profile of the currently authenticated user. The user must be logged in and provide a valid token.

### Method
`GET`

### Headers
- `Authorization`: `Bearer <JWT token>`

### Response

#### Success (200 OK)
```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "socketId": "string (optional)"
}
```

#### Error (401 Unauthorized)
Occurs when the token is missing or invalid.
```json
{
  "message": "Unauthorized"
}
```

---

## Endpoint: `/users/logout`

### Description
This endpoint is used to log out the currently authenticated user. It clears the authentication token from cookies and blacklists the token.

### Method
`GET`

### Headers
- `Authorization`: `Bearer <JWT token>`

### Response

#### Success (200 OK)
```json
{
  "message": "Logged out successfully"
}
```

#### Error (401 Unauthorized)
Occurs when the token is missing or invalid.
```json
{
  "message": "Unauthorized"
}
```

---

### Notes
- Ensure the `Authorization` header is set to `Bearer <JWT token>` for protected routes.
- The `/users/logout` endpoint blacklists the token, making it unusable for future requests.
