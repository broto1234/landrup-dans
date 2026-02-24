"use client";
import { addUserToActivity } from "@/app/lib/dal";

export default function AddActivity({ activityId }) {

  return (
    <div className="w-40 absolute bottom-6 right-10 bg-background text-xs text-center px-8 py-2 rounded-sm"> 
      <form action={async () => await addUserToActivity(activityId)}>
        <button type="submit">Tilmeld</button>
      </form>
    </div>
  );
}