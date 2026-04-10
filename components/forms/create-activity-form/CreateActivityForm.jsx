"use client";

import { useActionState } from "react";
import { createActivityData } from "@/actions/activities-actions";

const initialState = {
  values: {
    name: "",
    description: "",
    weekday: "",
    time: "",
    maxParticipants: "",
    minAge: "",
    maxAge: "",
    file: null,
  },
  errors: undefined,
};

export default function CreateActivityForm() {
  const [state, formAction, isPending] = useActionState( createActivityData, initialState );

  return (
    <form action={formAction} noValidate className="flex flex-col space-y-2">
      <div>
          <input 
          type="text"
          name="name"
          placeholder="Activity Name"
          defaultValue={state?.values?.name}
          className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
        />
        {state?.errors?.name && <p className="text-red-500 text-xs mt-1">{state?.errors?.name}</p>}
      </div>
      <div>
       <textarea name="description" placeholder="Description" defaultValue={state?.values?.description} rows={4}          
          className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500 resize-none" />
          {state?.errors?.description && <p className="text-red-500 text-xs mt-1">{state?.errors?.description}</p>}
      </div>
      <div className="w-full flex justify-between gap-2">
           <div className="w-full">
              <select 
                name="weekday"
                defaultValue={state?.values?.weekday}
                className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" >
                  <option value="">Select weekday</option>
                  <option value="mandag">Monday</option>
                  <option value="tirsdag">Tuesday</option>
                  <option value="onsdag">Wednesday</option>
                  <option value="torsdag">Thursday</option>
                  <option value="fredag">Friday</option>
                  <option value="lørdag">Saturday</option>
                  <option value="søndag">Sunday</option>
              </select>
             {/* <input 
              // type="text"
              name="weekday"
              placeholder="Weekday"
              defaultValue={state?.values?.weekday}
              className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
            /> */}
            {state?.errors?.weekday && <p className="text-red-500 text-xs mt-1">{state?.errors?.weekday}</p>}
          </div>
          <div className="w-full">
            <input 
              type="time"
              name="time"
              placeholder="Time"
              defaultValue={state?.values?.time}
              className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
            />
            {state?.errors?.time && <p className="text-red-500 text-xs mt-1">{state?.errors?.time}</p>}
          </div>
        </div>
        <div className="w-full flex justify-between gap-2">
           <div className="w-full">
            <input
              type="number"
              name="minAge"
              placeholder="Min Age"
              defaultValue={state?.values?.minAge}
              className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
            />
            {state?.errors?.minAge && <p className="text-red-500 text-xs mt-1">{state?.errors?.minAge}</p>}
          </div>
          <div className="w-full">
            <input 
              type="number"
              name="maxAge"
              placeholder="Max Age"
              defaultValue={state?.values?.maxAge}
              className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
            />
            {state?.errors?.maxAge && <p className="text-red-500 text-xs mt-1">{state?.errors?.maxAge}</p>}
          </div>
        </div>
        <div className="w-full">
           <input
            type="number"
            name="maxParticipants"
            placeholder="Max Participants"
            defaultValue={state?.values?.maxParticipants}
            className="w-full px-2 py-1 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500" 
          />
          {state?.errors?.maxParticipants && <p className="text-red-500 text-xs mt-1">{state?.errors?.maxParticipants}</p>}
        </div>
        <div className="w-60 mx-auto">
          <input type="file" name="file" accept="image/*" required />
        </div>
        <button
            type="submit"
            disabled={isPending}        
            className="w-40 mx-auto p-2 mt-2 bg-white text-sm text-black font-semibold rounded-md hover:bg-blue-400 hover:text-foreground">
              {isPending ? "Creating..." : "Create Activity"}
        </button> 
      {state?.errors?.form && <p className="text-red-500 text-xs mt-2">{state?.errors?.form}</p>}
    </form>
  );
}