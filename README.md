# FlowTracker - Time and Focus Management Application
FlowTracker is a web application designed to help users manage their focus and break times using the Flowtime technique. It features a timer for focus sessions, calculates the ideal break time, and offers a clean user interface for tracking productivity.

This project is built with **Spring Boot** for backend and **Next.js** + **shadcn/ui** for frontend, with **Swagger** documentation for the API.

## Table of Contents
- [Running the Project](#running-the-project)
- [Backend Overview](#backend-overview)
- [Frontend Overview](#frontend-overview)
- [Design and Prototyping](#design-and-prototyping)
- [Documentation](#documentation)
- [Technologies Used](#technologies-used)

## Running the Project
To run the project, follow these steps:
1. Clone the project repository
```bash
git clone https://github.com/guilherme-SN/flow-tracker.git
```

2. Inside the backend/ directory, run the Spring Boot application with the following environment variables
```bash
PROD_DB_HOST=localhost PROD_DB_PORT=3307 PROD_DB_NAME=flowtrackerdatabase \
PROD_DB_USERNAME=root PROD_DB_PASSWORD=verysecret \
mvn spring-boot:run
```
> You need to have `Docker` installed

3. Inside the frontend/ directory, run the Next.js application
```bash
npm install
npm run dev
```
> You need to have `npm` installed

4. Access the frontend URL provided by Next.js, which is usually: [http://localhost:3000](http://localhost:3000)

## Backend Overview
The backend of the project was developed with Spring Boot and is separate from the frontend. It provides a RESTful API to manage the application.

### Backend Structure
- config/ → Stores application configurations like CORS and Swagger
- controller/ → Defines API endpoints that interact with the frontend
- dto/ → Stores Data Transfer Objects
- model/ → Stores models for database entities (ORM)
- repository/ → Interfaces to communicate with the database using JPA
- service/ → Contains the core logic of the application

## Frontend Overview
The frontend of the project was built with Next.js and follows the Single Page Application (SPA) approach.

### Frontend Structure
- app/ → Contains the application pages following Next.js App Router
- components/ → Reusable UI components
- lib/ → Utility functions (if needed)

## Design and Prototyping
The design interface of FlowTracker was created using Figma. You can access the figma [here](https://www.figma.com/design/TJZcWenP4a4DFs1PBcejBr/FlowTracker?node-id=0-1&t=sAJzksesbQ4gembn-1).

## Documentation
The API is documented using Swagger and can be accessed via:

```bash
http://localhost:8080/swagger-ui/index.html
```

## Technologies Used

### Backend:
- Spring Boot
- MySQL
- Swagger (for API documentation)
- Maven (for dependency management)

### Frontend:
- Next.js (React framework)
- Shadcn UI (UI components)
- TypeScript (static typing)

