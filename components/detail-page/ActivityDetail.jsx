"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { addUserToActivity } from "@/services/users/addUser-service";
import { deleteUserFromActivity } from "@/services/users/removeUser-service";
import { Card, CardContent } from '@/components/ui/card';

export default function ActivityDetail({ activity, user, token }) {
  
  const [error, setError] = useState("");

  const isInitialRegistered = user?.activities?.some((a) => a.id === activity.id);
  
  const [isRegistered, setIsRegistered] = useState(isInitialRegistered);  

  const isAgeEligible = (userAge, minAge, maxAge) => {
    return userAge >= minAge && userAge <= maxAge;
  };

  const isParticipantLimitReached = activity.participants >= activity.maxParticipants;

  const hasSameDayActivity = user?.activities?.some(
    (a) =>
      a.weekday === activity.weekday && a.id !== activity.id
  );

  const handleRegister = async () => {
    setError("");

    if (isRegistered) {
      setError("You are already registered.");
      return;
    }

    if (isParticipantLimitReached) {
      setError("This class is full.");
      return;
    }

    if (!isAgeEligible(user.age, activity.minAge, activity.maxAge)) {
      setError("You do not meet the age requirement.");
      return;
    }

    if (hasSameDayActivity) {
      setError("You already have an activity on this weekday.");
      return;
    }

    try {
      await addUserToActivity(user.id, activity.id, token);
      setIsRegistered(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLeave = async () => {
    setError("");

    try {
      await deleteUserFromActivity(user.id, activity.id, token);
      setIsRegistered(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Decide button behavior
  let buttonText = "Register";
  let onClick = handleRegister;
  let disabled = false;

  if (isRegistered) {
    buttonText = "Leave";
    onClick = handleLeave;
  } else if (isParticipantLimitReached) {
    buttonText = "Full";
    disabled = true;
  } else if (hasSameDayActivity) {
    buttonText = "Already booked this day";
    disabled = true;
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto text-black">
        <Card className="rounded-2xl shadow-lg">
          <div className="relative">
            <div className="absolute top-3 left-4 z-20">
              <Link href="/activities" className="text-sm p-2 bg-amber-800">
                <FaArrowLeft size={20} className="inline text-white" />
              </Link>
            </div>
            <Image
              src={activity.asset.url}
              alt={activity.name}
              width={400}
              height={100}
              className="w-full h-[60vh] md:h-200 object-cover"  
            />
            <div className='flex flex-col items-end absolute bottom-3 right-1 z-20'>
              {user && (
                <button
                  onClick={isRegistered ? handleLeave : handleRegister}
                  disabled={isParticipantLimitReached || hasSameDayActivity}
                  className={`text-white px-4 py-2 rounded ${
                    isRegistered
                      ? "bg-red-500 hover:bg-red-600"
                      : isParticipantLimitReached || hasSameDayActivity
                      ? "bg-gray-400"
                      : "bg-bgColor hover:bg-bgColor/50"
                  }`}
                >
                  {isRegistered
                    ? "Leave"
                    : isParticipantLimitReached
                    ? "Full"
                    : hasSameDayActivity
                    ? "Already booked this day"
                    : "Register"}
                </button>
              )}
              {error && <p className="text-orange-500 text-xs font-semibold">{error}</p>}
            </div>
          </div>
          <CardContent className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">{activity.name}</h1>
            <div className='flex justify-between'>
              <p><span className="font-semibold">Weekday:</span> {activity.weekday} </p>
              <p><span className="font-semibold">Time:</span> {activity.time}</p>
            </div>
            <p>
              <span className="font-semibold">Age restriction:</span> {activity.minAge} - {activity.maxAge}
            </p>
            <p>
              <span className="font-semibold">Description:</span> {activity.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}