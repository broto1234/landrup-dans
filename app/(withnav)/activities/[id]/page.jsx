// app/activities/[id]/page.jsx
import ActivityDetails from '@/components/detailpage/ActivityDetail';
import { getSingleActivity } from '@/lib/dal';
import { cookies } from 'next/headers';

export default async function ActivityPage({ params }) {
  // ✅ unwrap params if it's a Promise
  const resolvedParams = await params; 
  const { id } = resolvedParams;

  // ✅ get cookies properly
  const cookieStore = await cookies(); // cookies() is synchronous in the latest Next.js 16 server component API
  const token = cookieStore.get('accessToken')?.value; 
  const userId = cookieStore.get('userId')?.value;
  console.log("Token from cookies:", token);
  console.log("User ID from cookies:", userId);

  let user = null;

  if (token) {
    const res = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 }, // Ensure we get fresh data on each request
    });
    if (res.ok) user = await res.json();
  }

  let activity = null;

  try {
    activity = await getSingleActivity(id);
  } catch (err) {
    return (
      <div className="text-center text-red-600 mt-20">
        Failed to load activity: {err.message}
      </div>
    );
  }

  return <ActivityDetails user={user} token={token} activity={activity} />;
}

// import ActvCard from "@/components/activityCards/ActvCard";
// import { getSingleActivity } from "@/lib/dal";
// import { getUserById } from "@/actions/actions";


// export default async function ActivityPage({ params }) {

//   const { id } = await params;
//   const activityId = await getSingleActivity(id);
//   const user = await getUserById();
//   // console.log("Activity data:", activityId);
//   console.log("User data:", user);

//   const isUserEnrolled = user.activities?.some(activity => activity.id === Number(id));

//   // console.log("Is user enrolled in this activity?", isUserEnrolled);

//   return (
//     <main className="min-h-screen">
//       <ActvCard user={user} activity={activityId} isUserEnrolled={isUserEnrolled} />
//     </main>
//   );
// }