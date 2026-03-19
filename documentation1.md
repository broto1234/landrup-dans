
This application demonstrates:

- Server-side rendering using **Next.js App Router**
- Dynamic routing with URL parameters ([id])
- *GET* and *POST* HTTP methods with **Fetch API**
- Form handling using **Server Actions**
- Schema validation using **Zod**
- Dynamic routing with **params**
- Query filtering using **searchParams**
- Clean and responsive UI using **Tailwind CSS**


## 🛠 Tech Stack

| Technology | Purpose |
|------------|----------|
| Next.js (App Router) | Full-stack React framework |
| Tailwind CSS | Styling |
| Zod | Schema validation |
| Fetch API | HTTP requests |
| npm | Package management |


## 📂 Project Structure

```bash
app/                   # Main application pages
  (with-header)/       # Pages with header layout
    login/             # Login page
      page.jsx
    register/          # Register page
      page.jsx
    layout.jsx         # Layout for pages with header
    page.jsx           # Homepage or general page
  (withnav)/           # Pages with navigation layout
    activities/        # Activities pages
      [id]/            # Dynamic activity pages
        page.jsx
      page.jsx         # Activities main page
    instructor/        
      [id]/            
        page.jsx
      page.jsx         
    user/              
      page.jsx
    layout.js          
components/            # Reusable React components
  activityCards/       # Components related to activities display
  home/                # Components used in the home page
  ...
lib/                   # Helper functions and libraries
  dal.js               # Data Access Layer for API or database calls.
  validations.js       # Form and input validations.
actions.js             # Contains server actions (e.g., create activity, login/register form)
globals.css            # Global CSS styles
holdtyperData.js       
layout.jsx             # Global layout
not-found.js           # 404 page
public/                # Static assets (images, icons, SVGs)
.env                    # Environment variables
.gitignore              # Git ignore file
eslint.config.mjs       
next-env.d.ts           
next.config.ts          
package-lock.json       # NPM lock file
package.json            # Project dependencies
postcss.config.mjs      # PostCSS configuration
README.md               # Project documentation
tsconfig.json           # TypeScript configuration
```

### Structure Explanation

 `app/`
  - Uses Next.js App Router.
  - (with-header) and (withnav) folders indicate different layouts for pages.
  - Dynamic routes are indicated by [id]/.

`components/`
  - Modular React components grouped by feature or page.
  - Keeps UI elements reusable and organized.

`lib/`
  - JavaScript utility functions and data handling logic.

`lib/dal.js`
  - Data Access Layer → handles the raw HTTP request (for the fetch call- GET, POST, PUT, DELETE)
  - Pure API communication (No cookies, No redirect, No revalidatePath, No Next.js logic). 
  - This function only talks to your backend
  - It throws errors
  - It returns data
  - That’s it

`app/actions.js`
  - Server Actions → Handle authentication, cookies, redirects, and UI revalidation.

`public/`
  - All static assets like images, icons, and SVGs.

`Configuration files`
  - .env – environment variables
  - eslint.config.mjs – linting rules
  - next.config.ts – Next.js settings


## 🌐 API Routes

### GET /api/activities

Fetch all activities.

```js
export async function getAllActivities() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/activities`,{
      cache: "no-store"
    });
    
    if(!res.ok){
        throw new Error({message: res.statusText})
    }
    
    return await res.json();

  } catch (error) {
    console.log("Network error:", error);
    return {
      success: false,
      message: "Network error while fetching activities"
    }
  }    
}
```

**Description**

- The **getAllActivities** function retrieves a list of all available activities from the backend API.

**How it Works**

**1. API Request**

- The function sends a `GET` request to the activities endpoint:

  ```bash
  /api/v1/activities
  ```

- The base URL is stored in an environment variable:

  ```bash
  process.env.API_URL
  ```

**2. Cache Control**

- The request uses:
  ```bash
  cache: "no-store"
  ```

  This ensures that **Next.js does not cache the response**, so the application always receives the **latest activity data**.
  This is important when users join or leave activities because the list must update immediately.

**3. Response Validation**

  If the API response is not successful (res.ok === false), the function throws an error using the status text returned by the API.

**4. Return Data**

  If the request succeeds, the function converts the response to JSON and returns the list of activities.

**Error Handling**

- If a network error occurs (for example, the API is unavailable), the function catches the error and returns an object with:

  - `success: false`

  - `an error message`


### POST /api/users

Create new user.

```js
export async function joinActivity(userId, activityId, token) {
  const res = await fetch(
    `${process.env.API_URL}/api/v1/users/${userId}/activities/${activityId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to join activity");
  }
  
  return res.json();
}
```


## 🧾 Form Handling (Server Actions)
`app/components/loginForm.jsx` → uses the `useActionState` hook to manage form state and handle form submission

Example:

```jsx
"use client";

<form  action={formAction} noValidate className="flex flex-col space-y-2">
  ...
</form>
```

Server Action:

```js
"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema } from "./lib/validations";

export async function loginData( formData ) {
  const cookiesStore = await cookies();
  const username = formData.get("username");
  const password = formData.get("password");

  const validationResult = loginSchema.safeParse({ username, password });
  
  if (!validationResult.success) {
    return {
      values: { username, password },
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }
  
  const res = await fetch(`${process.env.API_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }); 
  
  if (!res.ok) {
    return {
      values: { username, password },
      errors: { form: ["Invalid username or password"] },
    };
  }

  const result = await res.json();
  console.log("Server response:", result);

  cookiesStore.set("accessToken", result.token);
  const decode = jwt.decode(result.token);
  const role = decode?.data?.role;
  if (role === "default") { redirect("/user") }
  redirect("/instructor");
}
```

## ✅ Validation (Zod)

`app/lib/validations.js` → Contains centralized validation logic

```js
import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});
```

### Why Zod?

- Runtime validation
- Type inference
- Centralized schema management
- Prevents invalid data submission


## 🔀 Dynamic Routing (Params)

Folder:

```
app/users/[id]/page.jsx
```

Usage:

```js
export default function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;
}
```

## 🔎 Search Params (Query Strings)

Example URL:

```
/users?role=admin
```

Usage:

```js
export default function Page({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const role = searchParams.role;
}
```

### Use Cases

- Search functionality
- Filtering
- Sorting
- Pagination


## 🎨 Styling with Tailwind CSS

Example:

```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
  Submit
</button>
```

Features:

- Utility-first styling
- Mobile-first approach
- Responsive design
- Dark mode support (optional)


## 🚨 Error Handling Strategy

- Validation errors → Returned with 400 status
- Server errors → 500 status
- Network errors → Handled with try/catch
- UI error messages displayed conditionally


## 🔐 Best Practices Used

- Server-side validation (never trust client input)
- Separation of concerns (UI, logic, validation)
- Centralized schema definitions
- Proper HTTP status codes
- Type-safe data flow


## Learning Goals Demonstrated

- Understanding Next.js App Router architecture
- Using Fetch API in both server and client contexts
- Implementing server actions
- Handling form validation professionally
- Managing dynamic and query-based routing
