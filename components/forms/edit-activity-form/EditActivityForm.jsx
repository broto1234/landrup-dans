"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateActivityData } from "@/actions/activities-actions";


export default function EditActivityForm({ activityId, activity }) {
  // console.log("EditActivityForm received params:", activityId);
  
  const initialState = {
    values: {
      name: activity?.name || "",
      description: activity?.description || "",
      weekday: activity?.weekday || "",
      time: activity?.time || "",
      maxParticipants: activity?.maxParticipants || "",
      minAge: activity?.minAge || "",
      maxAge: activity?.maxAge || "",
    },
    errors: undefined,
  };

  const [state, formAction, isPending] = useActionState(updateActivityData.bind(null, activityId), initialState);
  // const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  // useEffect(() => {
    // if (state?.success) {
      // router.push("/instructor");
      // setShowSuccess(true);
    // }
  // }, [state]);

  return  (
    <section className="px-4 flex flex-col items-center gap-6 h-[93vh] justify-center">
      <form action={formAction} noValidate className="flex flex-col space-y-2">                
        <div>
          <input 
            type="text"
            name="name"
            placeholder="Activity Name"
            defaultValue={state?.values?.name}
            className="w-full p-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-sm text-gray-500" 
          />
          {state.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name}</p>}
        </div>
        <div>
          <textarea name="description" placeholder="Description" defaultValue={state?.values?.description} rows={4}          
          className="w-full p-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-sm text-gray-500 resize-none" />
          {state.errors?.description && <p className="text-red-500 text-xs mt-1">{state.errors.description}</p>}
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
              type="text"
              name="weekday"
              placeholder="Weekday"
              defaultValue={state?.values?.weekday}
              className="w-full p-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-sm text-gray-500" 
            /> */}
            {state.errors?.weekday && <p className="text-red-500 text-sm mt-1">{state.errors.weekday}</p>}
          </div>
          <div className="w-full">
            <input 
              type="text"
              name="time"
              placeholder="Time"
              defaultValue={state?.values?.time}
              className="w-full p-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-sm text-gray-500" 
            />
            {state.errors?.time && <p className="text-red-500 text-xs mt-1">{state.errors.time}</p>}
          </div>
        </div>
        <div className="w-full flex justify-between gap-2">
          <div className="w-full">
            <input type="number"
              name="minAge"
              placeholder="Min Age"
              defaultValue={state?.values?.minAge}
              className="w-full p-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-sm text-gray-500" 
            />
            {state.errors?.minAge && <p className="text-red-500 text-xs mt-1">{state.errors.minAge}</p>}
          </div>
          <div className="w-full">
            <input type="number"
              name="maxAge"
              placeholder="Max Age"
              defaultValue={state?.values?.maxAge}
              className="w-full p-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-sm text-gray-500" 
            />
            {state.errors?.maxAge && <p className="text-red-500 text-xs mt-1">{state.errors.maxAge}</p>}
          </div>
        </div>
        <div className="w-full flex justify-between gap-2">
          {/* <div className="w-full">
            <select
              name="instructor"
              defaultValue={state?.values?.instructor}
              className="w-full p-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-sm text-gray-500"
            >
              <option value="" disabled>
                Instructor
              </option>
              <option value="john">John</option>
              <option value="mary">Mary</option>
              <option value="alex">Alex</option>
            </select>
            {state?.errors?.instructor && <p className="text-red-500 text-xs mt-1">{state.errors.instructor}</p>}
          </div> */}
          <div className="w-full">
          <input type="number"
            name="maxParticipants"
            placeholder="Max Participants"
            defaultValue={state?.values?.maxParticipants}
            className="w-full p-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-sm text-gray-500" 
          />
          {state?.errors?.maxParticipants && <p className="text-red-500 text-xs mt-1">{state.errors.maxParticipants}</p>}
        </div>
        </div>

        <div className="mx-auto flex justify-between gap-2">
          <button
            type="button"
            onClick={() => router.push("/instructor")}
            className="w-30 mx-auto p-2 mt-2 bg-white text-sm text-black font-semibold rounded-md hover:bg-red-400 hover:text-foreground"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}        
            className="w-30 mx-auto p-2 mt-2 bg-white text-sm text-black font-semibold rounded-md hover:bg-green-400 hover:text-foreground">
              {isPending ? "Updating..." : "Update"}
          </button> 
        </div>

        {/* {showSuccess && <p className="text-green-500 text-xs mt-2">Registration successful!</p>} */}
        {state?.errors?.form && <p className="text-red-500 text-xs mt-2">{state.errors.form}</p>}
      </form>
    </section>
  );
}
