# Landrup Dans

A modern full-stack dance activity management application built with **Next.js** and **TailwindCSS**, integrated with an external REST API.

## Live Demo

- Frontend: (add your Vercel link)
- API: (https://landrup-api-h4b5.onrender.com)

## Tech Stack

| Layer                    | Technology |
| -------------            | -------- |
| Frontend (UI)            |  Next.js(App Router)  | 
| Styling                  | TailwindCSS | 
| Validation               | Zod    |
| Authentication	         | JWT (stored in cookies) |
| Backend API              | External REST API (hosted on Render)|
| Deployment	             | Vercel (Frontend), Render (Backend) |


## Role-Based Access

The application supports two roles:

- User: browse and join activities
- Instructor: create, edit, and delete activities

## Key Features

- `CRUD` operations (Create, Read, Update, Delete)
- Form validation using `Zod`
- Authentication using `JWT` stored in cookies
- `Role-based` UI rendering
- Server-side data fetching with Next.js
- Error handling and API validation
- Protected routes using `proxy.js`


## Data Handling & State Strategy

### 1. Local UI State

Handled using React hooks (useState, useActionState):

Example:
```
const [state, formAction, isPending] = useActionState(updateActivityData, initialState);
```
Used for:

- forms inputs
- loading state
- validation errors

### 2. Server Data (Next.js) fetched via server components
Example:
```
const activities = await allActivities();
```

Used for:

- Fetching API data
- Server-side rendering
- activities and users

### 3. Authentication State

Example:
```
cookies().get("accessToken")
```

Used for:

- Stored in cookies (accessToken)
- Used globally across the application
- Enables persistent login state

## Authentication & Route Protection

```
Authorization: `Bearer ${accessToken}`
```

- `JWT` (JSON Web Token)-based authentication
- Authenticated requests using Authorization headers
- Token stored in `cookies` for session persistence

- Protected routes using Next.js `proxy.js`
- Unauthorized users are redirected to the login page

## API Integration

- Consumes an external REST API hosted on Render
- Uses `fetch` for API requests
- Handles authentication via Bearer tokens
- Centralized API handling for maintainability

## Error Handling

Example (Server Action)

In activities-actions.js:
```
try {    
    await addActivity(token, payload);
  } catch (err) {
    return {
      payload,
      errors: { form: err.message || "Something went wrong" },
    };
};
```

Example (API Request)
In addActivity-server.js:
```
const res = await fetch(`${BASE_URL}/api/v1/activities`, {...})

if (!res.ok) {
    const text = await res.text();
    const errorMessage = text || "Failed to add activity";
    throw new Error(errorMessage);
}
```

- Used `try-catch` for async error handling
- Checked API responses using `res.ok`
- Logged detailed error responses for debugging
- Handled unexpected API responses (e.g. JSON + HTML errors)

## Known Limitations

- API hosted on Render free tier may: 
  - Cause slow initial response (cold start)
  - Sleep after inactivity

### Predefined Users

There are 10 predefined users in the API:

| id | username | password | age | role |
| --- | --- | --- | --- | --- |
| 1 | instructor1 | 1234 | 24 | instructor |
| 2 | instructor2 | 1234 | 32 | instructor |
| 3 | instructor3 | 1234 | 27 | instructor |
| 4 | instructor4 | 1234 | 31 | instructor |
| 5 | user1 | 1234 | 14 | default |
| 6 | user2 | 1234 | 17 | default |
| 7 | user3 | 1234 | 21 | default |
| 8 | user4 | 1234 | 24 | default |
| 9 | user5 | 1234 | 52 | default |
| 10 | user6 | 1234 | 51 | default |
