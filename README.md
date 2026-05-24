# CookBook Backend

Backend application for recipe and recipe category management.

The application provides CRUD operations for recipes and recipe categories using REST API endpoints.

---

# Technologies

- Node.js
- Express.js
- AJV validation
- JavaScript
- File-based JSON storage

---

# Project Structure

```txt
server/
│
├── abl/          -> application business logic
├── controller/   -> API routes
├── dao/          -> data access layer
├── storage/      -> JSON data storage
├── app.js        -> application entry point
```

---

# Installation

Install dependencies:

```bash
npm install
```

---

# Run Backend Server

Start backend server:

```bash
node app.js
```

or

```bash
npm start
```

---

# Server URL

Backend server runs on:

```txt
http://localhost:8888
```

---

# API Endpoints

## RecipeCategory

### Get all recipe categories

```http
GET /recipeCategory/list
```

### Get recipe category detail

```http
GET /recipeCategory/get?id=
```

### Create recipe category

```http
POST /recipeCategory/create
```

### Update recipe category

```http
POST /recipeCategory/update
```

### Delete recipe category

```http
POST /recipeCategory/delete
```

---

## Recipe

### Get all recipes

```http
GET /recipe/list
```

### Get recipe detail

```http
GET /recipe/get?id=
```

### Create recipe

```http
POST /recipe/create
```

### Update recipe

```http
POST /recipe/update
```

### Delete recipe

```http
POST /recipe/delete
```

---

# Features

- CRUD operations for recipes
- CRUD operations for recipe categories
- Validation using AJV
- File-based persistent storage
- REST API architecture
- Recipe to RecipeCategory relation

---

# Author

Radek Tichý
