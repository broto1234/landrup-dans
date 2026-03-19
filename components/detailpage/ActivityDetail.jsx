// app/activities/[id]/page.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
// import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ActivityDetails({ user, token, activity }) {

  console.log("Activity details received:", activity);
  console.log("User details received:", user);

  const [isRegistered, setIsRegistered] = useState(
    user?.activities?.some((a) => a.id === activity.id)
  );
  const [error, setError] = useState('');
  // const params = useParams();

  const handleRegister = async () => {
    setError('');

    // Check age restriction
    if (user.age < activity.minAge || user.age > activity.maxAge) {
      setError('You do not meet the age requirement.');
      return;
    }

    // Check same weekday
    if (user.activities?.some((a) => a.weekday === activity.weekday)) {
      setError('You already have an activity on this weekday.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/v1/users/${user.id}/activities/${activity.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id, activityId: activity.id }),
      });

      if (!res.ok) throw new Error('Registration failed');

      setIsRegistered(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLeave = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/v1/users/${user.id}/activities/${activity.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });

      if (!res.ok) throw new Error('Could not leave activity');

      setIsRegistered(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto text-black">
        <Card className="rounded-2xl shadow-lg">
          <div className="relative">
          <Image
                    src={activity.asset.url}
                    alt={activity.name}
                    width={400}
                    height={100}
                    className="w-full h-[60vh] md:h-200 object-cover"  
          />
          <div className='absolute bottom-3 right-5'>
            {error && <p className="w-40 text-red-500 font-medium">{error}</p>}
            {user && (
              isRegistered ? (
                <Button
                  onClick={handleLeave}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Leave
                </Button>
              ) : (
                <Button
                  onClick={handleRegister}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Register
                </Button>
              )
            )}
          </div>
          </div>
          <CardContent className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">{activity.name}</h1>
            <p className='flex justify-between'>
              <span className="font-semibold">Weekday:</span> {activity.weekday} 
              <span className="font-semibold">Time:</span> {activity.time}
            </p>
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