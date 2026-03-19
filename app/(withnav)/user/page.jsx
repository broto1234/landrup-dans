import { cookies } from "next/headers";
import VisHold from "@/components/VisHold";
import ProfileCard from "@/components/instructor/ProfileInfo";
import { getUserById } from "@/actions/actions";

export default async function UserPage() {
  // const cookiesStore =  await cookies();
  // const accessToken = cookiesStore.get("accessToken")?.value;
  // const userId = cookiesStore.get("userId")?.value;
  // console.log("User ID from cookies:", userId);
  // console.log("Access Token from cookies:", accessToken);

  // if (!accessToken) {
  //   redirect("/login");
  // }

  const user = await getUserById();
  console.log("Fetched user data:", user);

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
                  <VisHold activityId={activity.id} />
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
