# Lixo Technical Test

## Prerequisites
Before starting, ensure you have the following installed on your system:
- **Docker**
- **Docker Compose** (comes bundled with Docker Desktop)

## Project Structure
- **part-one.ts**: Contains the answer to first exercise
- **part-two.ts**: Contains the answer to second exercise
- **test-api/**: Contains the NestJS API code and its Dockerfile.
- **test-webapp/**: Contains the React Vite web application code and its Dockerfile.
- **docker-compose.yml**: Defines the services for the database, API, and web app.

---

## Launch the Project
1. **Navigate to the Project Folder:**
   ```bash
   cd lixo-technical-test
   ```

2. **Start the Services:**
   Run the following command to build and start the containers:
   ```bash
   docker-compose up --build
   ```

3. **Access the Application:**
   - **React Web App:** Open your browser and go to [http://localhost:3000](http://localhost:3000).
   - **NestJS API:** The API will be running at [http://localhost:3001](http://localhost:3001).
   - **NestJS API Documentation :** The API documentation will be running at [http://localhost:3001/api](http://localhost:3001).

## Potential Improvements

These are the things i'd like to add but couldn't due to time limitation ;

- Notification on vacation and employee successful creation
- Better styling, response and alignment. I use premade style from tailwindUI but didn't tweak it much
- Better form validation both on front and back with checks on already existing vacations overlaps