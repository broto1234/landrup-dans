"use client";

import { addUserToActivity } from "@/actions/actions";

export default function AddActivity({ user, activity, isUserEnrolled }) {

  const activityId = activity.id;
  const maxAge = activity.maxAge ;
  const minAge = activity.minAge;
  const userAge = user?.age;

  const isAgeValid = userAge >= minAge && userAge <= maxAge;

  const handleJoin = () => {  
    addUserToActivity(activityId, isUserEnrolled);
  };

  return (
    <div className="absolute bottom-6 right-10 bg-background text-xs text-center px-2 py-3 rounded-sm"> 
        <button type="submit" onClick={handleJoin} className="text-xl tracking-widest w-40 cursor-pointer">
          {isUserEnrolled ? "Forlad" : isAgeValid ? "Tilmeld" : "Ikke kvalificeret"}
        </button>
    </div>
  );
}

// client button allows server action. A button can trigger a Server Action, but not because it’s a button itself. It works because the button triggers an event (onClick event) that calls a server action.

// Browser (Client Component)
//       ↓ click
// handleJoin()
//       ↓
// Next.js calls Server Action
//       ↓
// addUserToActivity() runs on the server
//       ↓
// cookies(), redirect(), revalidatePath() work