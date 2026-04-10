import { FaUser } from "react-icons/fa6";
import { requireTokens } from "@/lib/auth";
import { userById } from "@/services/users/userById-service";
import { activityById } from "@/services/activities/activityById-service";
import ProfileInfo from "@/components/profile-card/ProfileInfo";

export default async function instructorDetail({ params }) {
  
  const { id } = await params;
  const { token, userId } = await requireTokens();
  const user = await userById(userId, token);  

  const activityId = await activityById(id);
  
  return (
    <section className="min-h-screen">
      <ProfileInfo user={user} />
      <div className="px-3 py-6">
        <div className="space-y-3">
          <h2 className="text-lg">{activityId.name}</h2>
          <p className="text-sm">Participants:</p>
          <ul className="flex flex-col gap-3">
            {activityId.users && activityId.users.length > 0 ? activityId.users.map(user => 
              <li key={user.id} className="flex justify-between items-center p-2 bg-white text-bgColor rounded-md">
                <div className="flex items-center space-x-2">
                  <FaUser size={26} className="inline-block" />
                  <p>{user.firstname} {user.lastname}</p>
                </div>
                <p>{user.age} år</p>
              </li>
            ) : <p>No participants found.</p>}
          </ul>
        </div>
      </div>
    </section>
  );
}