# Flight Reservation React Frontend

## Overview
This is the React-based frontend for the Flight Reservation system. It communicates with the backend over HTTPS.

## Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the project root with the following variables:
```
REACT_APP_BACKEND_APP_HOST=localhost
REACT_APP_BACKEND_APP_PORT=8082
REACT_APP_BACKEND_APP_BASE_URL=/flightreservation-node-es6-react-backend
```

### 2. SSL Certificates
Place your SSL certificates in the `certs` folder:
- `cert.pem`: SSL certificate
- `key.pem`: SSL private key

### 3. Running the Frontend
#### Using Docker Compose
Run the following command:
```bash
docker-compose up --build
```

The frontend will be available at:
```
https://localhost
```

#### Using npm
For local development:
```bash
npm install
npm start
```

The frontend will be available at:
```
https://localhost:3000
```

### 4. Testing
To verify the frontend is working, navigate to:
```
https://localhost/flightreservation-node-es6-react-frontend/findFlights
```

### 5. Debugging
- Logs for the frontend URL are printed in the browser console.
- Nginx logs can be accessed using:
  ```bash
  docker logs <container_name>
  ```

---