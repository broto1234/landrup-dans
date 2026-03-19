"use client";

import { useActionState, useState, useEffect } from "react";
import Link from "next/link";
import { registerData } from "../actions";
import { fi } from "zod/v4/locales";

const initialState = {
  values: {
    firstname: "",
    lastname: "",
    username: "",
    age: "",
    password: "",
    confirmPassword: "",
  },
  errors: undefined,
  // success: false,
};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerData, initialState);
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
            name="firstname"
            placeholder="Fornavn"
            defaultValue={state?.values?.firstname}
            className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
          />
          {state.errors?.firstname && <p className="text-red-500 text-xs mt-1">{state.errors.firstname}</p>}
        </div>
        <div>
          <input 
            type="text"
            name="lastname"
            placeholder="Efternavn"
            defaultValue={state?.values?.lastname}
            className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
          />
          {state.errors?.lastname && <p className="text-red-500 text-xs mt-1">{state.errors.lastname}</p>}
        </div>
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
            type="number"
            name="age"
            placeholder="Alder"
            defaultValue={state?.values?.age}
            className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
          />
          {state.errors?.age && <p className="text-red-500 text-xs mt-1">{state.errors.age}</p>}
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
        <div>
          <input 
            type="password"
            name="confirmPassword"
            placeholder="Bekræft kodeord"
            defaultValue={state?.values?.confirmPassword}
            className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
          />  
          {state?.errors?.confirmPassword && <p className="text-red-500 text-xs mt-1">{state.errors.confirmPassword}</p>}
        </div>
        <button
          type="submit"
          disabled={isPending}        
          className="w-40 mx-auto p-2 mt-2 bg-white text-sm text-black font-semibold rounded-md hover:bg-red-400 hover:text-foreground">
            {isPending ? "Logger ind..." : "Log ind"}
        </button> 
        {showSuccess && <p className="text-green-500 text-xs mt-2">Registration successful!</p>}
        {state?.errors?.form && <p className="text-red-500 text-xs mt-2">{state.errors.form}</p>}
      </form>
    </section>
  );
}