"use client";

import { useActionState, useState, useEffect } from "react";
import { newsletterData } from "@/actions/actions";

const initialState = {
  values: {
    email: "",
  },
  errors: {},
};


export default function NewsLetterForm() {
  const [state, formAction, isPending] = useActionState(newsletterData, initialState);
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
  }, [state?.success]);

  return (  
    <section className="my-4 px-4">
      <h2 className="text-md">NewsLetters</h2>
      <p className="text-[0.55rem] mt-2">Get direct updates when we have season starts or hold events.</p>
      <form className="relative mt-4 flex items-center space-x-2" action={formAction} noValidate>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={state?.values?.email}
            className="w-36 px-2 py-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500"            
          />
          {state?.errors?.email && <p className="text-red-500 text-xs">{state?.errors?.email}</p>}
        </div>
        {state?.errors?.form && <p className="text-red-500 text-xs mt-1">{state?.errors?.form}</p>}
        <button type="submit" disabled={isPending} className="p-3 bg-white text-xs text-black rounded-sm hover:bg-red-400 hover:text-foreground">
          {isPending ? "Subscribing..." : "Subscribe"}
        </button> 
        {/* {state?.errors && !state?.errors?.email && <p className="text-red-500 text-xs mt-1">Error subscribing</p>} */}
        {isSuccess && <p className="absolute top-8 text-green-500 text-xs mt-1">Subscribed to newsletter!</p>}
      </form>
    </section>
  );
}