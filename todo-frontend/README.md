# Todo App – Frontend

## Overview

React frontend for a Todo app. Users can add todo items, toggle them completed, and delete them. Todo data persisted via SQL lite.

## Tech Stack

- React/TypeScript
- React-Query
- CSS Modules
- Vite
- React Testing Library/Vitest

## Setup

```
npm install
npm run dev
```

- Runs on http://localhost:5173/
- Requires backend API to be running on http://localhost:5165/

To run unit tests:

```
npm test
```

## Architecture & Data Flow

- Small service layer for API communication
- React Query manages server state, caching, and invalidation
- Custom hooks (useTodos, useCreateTodo, etc.) wrap RQ queries & mutations
- Simple loading, error, and empty states
- Delayed loader to avoid UI flicker
- Disable/delete actions disabled while mutations pending to prevent duplicate actions
- Basic unit test setup

## Trade-offs & Assumptions

- No users/auth layer, all todos are global
- Styling is minimal, shared components & styles would be used in a prod environment

## Future Improvements

- Add optimistic updates for toggling todos
- Front-end validation:
  - Potential character limit for new todos
  - Prevent duplicate todo names
- Sorting & filtering
- Implement unit & E2E tests
