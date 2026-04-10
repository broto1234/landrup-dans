"use client";

import { useActionState, useState, useEffect } from "react";
import { messageData } from "@/actions/actions";

const initialState = {
  values: {
    name: "",
    email: "",
    message: "",
  },
  errors: {},
  // errors: undefined,
  // error: null,
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(messageData, initialState);
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
    <section className="my-4 px-4">
      <h2 className="text-3xl">Contact Us</h2>
      <form action={formAction} noValidate className="mt-4 flex flex-col space-y-2">                
        <div>
          <input 
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={state.values.name}
            className="w-full px-2 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
          />
          {state.errors.name && <p className="text-red-500 text-xs mt-1">{state.errors.name}</p>}
        </div>
        <div>
          <input 
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={state.values.email}
            className="w-full px-2 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
          />  
          {state.errors.email && <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>}
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Message"
            defaultValue={state.values.message}
            className="w-full px-2 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500 resize-none"
            rows="4"
          ></textarea>
          {state.errors.message && <p className="text-red-500 text-xs mt-1">{state.errors.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isPending}        
          className="w-40 mx-auto p-2 mt-2 bg-white text-sm text-black rounded-md hover:bg-red-400 hover:text-foreground">
            {isPending ? "Sending..." : "Send Message"}
        </button> 
        {showSuccess && <p className="text-green-500 text-xs mt-2">Message sent successfully!</p>}
        {state.errors.general && <p className="text-red-500 text-xs mt-2">{state.errors.general}</p>}
      </form>
    </section>
  );
}