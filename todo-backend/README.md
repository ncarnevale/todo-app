# Todo App API

## Project Overview

.NET API for a small MVP Todo app.

## Tech Stack

- .NET (Minimal APIs)
- Entity Framework Core
- SQLite
- Swagger API

## Setup Instructions

### To Run Locally:
```bash
cd TodoApi
dotnet restore
dotnet run
```

- API available at https://localhost/5165
- Swagger UI: http://localhost:5165/swagger

To run tests:

```bash
dotnet test
```

## API Endpoints

|      Method   |   URL            |  Description       |
|---------------|   ------------   |    ------------   |
| **GET**       | `/api/todos `     | Return all todos | 
| **POST**      | `/api/todos `     | Create a new todo | 
| **PUT**       | `/api/todos/{id}` | Toggle todo completed | 
| **DELETE**    | `/api/todos/{id}` | Delete a todo | 

(All endpoints return appropriate HTTP status codes and error responses.)

## Design Overview


- ASP.NET Minimal APIs used for simplicity and reduced boilerplate (felt more appropriate than MVC controllers given scope)
- SQLite + EF Core for persistence while keeping setup simple. In prod, this could be swapped for PostgreSQL or SQL Server with minimal code changes
- Request & Response DTOs used to decouple API contract from internal models
- Basic integration test included to validate core API functionality

## Future Improvements

- Introduce authentication for user ownership of todos
- Add pagination & filtering to GET endpoint
- Add PATCH endpoints for partial updates including text
- Introduce FluentValidation for richer validation
- Introduce centralized error handling and consistent error response shapes
- Extract business logic into dedicated services
- Implement integration tests for all endpoints
