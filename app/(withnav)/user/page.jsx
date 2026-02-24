import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import VisHold from "../../components/VisHold";
// import { redirect } from "next/navigation";
import ProfileCard from "../../components/instructor/ProfileInfo";
import { th } from "zod/v4/locales";


export default async function UserPage() {
  const cookiesStore =  await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  if (!accessToken) {
    redirect("/login");
  }
  const userId = jwt.decode(accessToken)?.data?.id;
  // const userId = user.id;

  const res = await fetch(`${process.env.API_URL}/api/v1/users/${userId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }, 
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch user data:", text);
    throw new Error("Failed to fetch user data");
  }

  const user = await res.json();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProfileCard user={user} />
      <div className="px-4 py-6">
          <h2 className="mb-3">Tilmeldte hold</h2>
          <ul className="space-y-3">
            {user.activities?.length ? (
              user.activities.map(activity => (
                <li key={activity.id} className="p-4 bg-blue-100 text-background rounded">
                  <h2 className="text-lg font-semibold">{activity.name}</h2>
                  <div>
                    <p className="text-sm"><span className="capitalize">{activity.weekday}</span> <span>kl. {activity.time}</span></p>
                  </div>
                  <VisHold />
                </li>
              ))
            ) : (
              <li>No activities available</li>
            )}
          </ul>
      </div>
    </div>
  );


}







// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { redirect } from "next/navigation";
// import ProfileCard from "../../components/ProfileCard";

// export default async function UserPage() {
//   const cookiesStore =  await cookies();
//   const accessToken = cookiesStore.get("accessToken")?.value;
//   if (!accessToken) {
//     redirect("/login");
//   }
//   const user = jwt.decode(accessToken).data;
//   // const user = JSON.parse(accessToken);
//   console.log("User from token:", user);

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <ProfileCard user={user} />
//     </div>
//   );
// }