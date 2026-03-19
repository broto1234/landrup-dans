# Dokumentation for ... 

Navn: Satyobroto Talukder, WU13

### Valgfi Opgave: 
Jeg har lavet Valgfri Opgave C - Opret bruger

## Technologies Used

**Next.js**

- Used as the main framework for both frontend and backend logic.
- The project uses the **App Router** for modern routing and server capabilities.

**React.js**

- Provides the **component-based architecture** used to build the user interface.

**TailwindCSS**

- Used for utility-first **styling** to quickly build responsive user interfaces.

**Zod**

- Provides **schema-based validation** for form inputs to ensure reliable and secure data handling.

**Version Control**

- The project uses **Git** for version control to track code changes and collaborate efficiently.

**Environment Variables**

- Sensitive configuration such as API keys or database URLs are stored in the **.env** file.

**Server Actions**

- Server actions manage secure **server-side** operations.

**Data Access Layer (DAL)**

- The Data Access Layer is responsible for handling **all interactions** with:

  - **APIs**
  - **Databases**

**Fetch API**

- Handles **data fetching** between the application and APIs.

**Authentication**

- The project uses **cookie-based** authentication to manage user sessions.

**Dynamic Routing**

- The application supports dynamic routes using **parameters**.

**Route Groups**
- are a way to organize **routes** and **layouts** without affecting the URL structure.


## Installation & Setup

### Clone the repository

```bash
git clone https://github.com/yourusername/project-name.git
cd project-name
```

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Visit:

```bash
http://localhost:3000
```

### Run backend server/API

```bash
npm start
```

Visit:

```bash

http://localhost:4000

```

## Code Example
Server Action function:
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
## Explanation: 

I use the `"use server"` directive to ensure that the function executes only **on the server** side in Next.js. This approach improves security because sensitive operations such as authentication, cookie management, and environment variable access are handled exclusively on the server.

The function `imports` several utilities required for the authentication workflow. It is declared as **asynchronous** `(async)` in order to handle operations that require waiting for responses, such as API requests, cookie handling, and parsing server responses. The use of `await` ensures that these asynchronous operations execute sequentially and reliably.

The `formData` object contains the values submitted by the user through the login form. These values are validated using `safeParse()` from Zod to verify that the submitted data follows the predefined validation schema.

After validation, the application sends the login credentials to an authentication API using the **Fetch API** (`fetch()`). The request includes **headers** to indicate that the body contains **JSON data**. Before sending the request, the data is converted into JSON format using `JSON.stringify()`.

When authentication is successful, the returned **JWT token** is stored in a cookie using `cookies().set()`. Finally, the application uses `redirect()` to navigate the user to the appropriate page after the server-side login process completes.

# My Logbook

## Day 1
start time: 8:30
end time: 15:30

## Day 2
start time:
end time: 

## Day 3
start time:
end time: 

## Day 4
start time:
end time: 

## Day 5
start time: 
end time: 