"use client";

import { useActionState, useState, useEffect } from "react";
import Link from "next/link";
import { loginData } from "../actions";

const initialState = {
  values: {
    username: "",
    password: "",
  },
  errors: undefined,
  // error: null,
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginData, initialState);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state?.success]);

  return (
    <section className="">
      <form action={formAction} noValidate className="flex flex-col space-y-2">                
        <div>
          <input 
            type="text"
            name="username"
            placeholder="Brugernavn"
            defaultValue={state?.values?.username}
            className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
          />
          {state.errors?.username && <p className="text-red-500 text-xs mt-1">{state.errors.username}</p>}
        </div>
        <div>
          <input 
            type="password"
            name="password"
            placeholder="Kodeord"
            defaultValue={state?.values?.password}
            className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
          />  
          {state?.errors?.password && <p className="text-red-500 text-xs mt-1">{state.errors.password}</p>}
        </div>
        <button
          type="submit"
          disabled={isPending}        
          className="w-40 mx-auto p-2 mt-2 bg-white text-sm text-black rounded-md hover:bg-red-400 hover:text-foreground">
            {isPending ? "Logger ind..." : "Log ind"}
        </button> 
        {showSuccess && <p className="text-green-500 text-xs mt-2">Login successful!</p>}
        {state?.errors?.form && <p className="text-red-500 text-xs mt-2">{state.errors.form}</p>}
        <p className="text-xs mt-2">Er du endnu ikke bruger? <Link href="/register" className="underline underline-offset-3">Opret dig her.</Link></p>
      </form>
    </section>
  );
}