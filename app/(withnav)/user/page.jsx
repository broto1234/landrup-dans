import SeeActivity from "@/components/SeeActivity";
import ProfileCard from "@/components/profile-card/ProfileInfo";
import { requireTokens } from "@/lib/auth";
import { userById } from "@/services/users/userById-service";

export default async function UserPage() {
  const { token, userId } = await requireTokens();
  const user = await userById(userId, token);
  // console.log("User data in UserPage:", user);

  return (
    <div className="min-h-screen bg-bgColor text-foreground">
      <ProfileCard user={user} />
      <div className="px-4 py-6">
          <h2 className="mb-3">Activities Lists</h2>
          <ul className="space-y-3">
            {user.activities?.length ? (
              user.activities.map(activity => (
                <li key={activity.id} className="p-4 bg-blue-100 text-bgColor rounded">
                  <h2 className="text-lg font-semibold">{activity.name}</h2>
                  <div>
                    <p className="text-sm"><span className="capitalize">{activity.weekday}</span> <span>kl. {activity.time}</span></p>
                  </div>
                  <SeeActivity activityId={activity.id} />
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
