"use client";
import { useActionState, useState, useEffect } from "react";
import { newsletterAction } from "../../../actions";

const initialState = {
  values: {
    email: "",
  },
  errors: undefined,
};


export default function Nyhedsbrev() {
  const [state, formAction, isPending] = useActionState(newsletterAction, initialState);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setIsSuccess(true);
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (state?.errors) {
      setIsSuccess(false);
    } else {
      setIsSuccess(false);
    }     
  }, [state?.success, state?.errors]);

    // console.log("Nyhedsbrev state:", state);

  return (  
    <section className="my-4 px-4">
      <h2 className="text-md">Nyhedsbrev</h2>
      <p className="text-[0.55rem] mt-2">Få direkte besked når vi har sæsonstart eller afholder arrangementer.</p>
      <form className="mt-4 flex items-center space-x-2" action={formAction} noValidate>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={state?.values?.email}
            className="w-36 px-2 py-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500"
            // className="w-36 px-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.errors?.email && <p className="text-red-500 text-xs">{state.errors.email}</p>}
        </div>
        {state?.errors?.form && <p className="text-red-500 text-xs mt-1">{state.errors.form}</p>}
        <button type="submit" disabled={isPending} className="p-3 bg-white text-xs text-black rounded-sm hover:bg-red-400 hover:text-foreground">
          {isPending ? "Tilmelding..." : "Tilmeld"}
        </button> 
        {isSuccess && <p className="text-green-500 text-xs mt-1">Tilmeldt nyhedsbrev!</p>}
        {state?.errors && !state?.errors?.email && <p className="text-red-500 text-xs mt-1">Fejl ved tilmelding</p>}
      </form>
    </section>
  );
}