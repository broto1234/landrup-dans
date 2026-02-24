import { FaUser } from "react-icons/fa6";
import { getSingleActivity } from "../../../lib/dal";
import ProfileInfo from "../../../components/instructor/ProfileInfo";

export default async function instructorDetail({ params }) {
  const { id } = await params;
  const activityId = await getSingleActivity(id);
  console.log("Activity data:", activityId.users);
  
  return (
    <section className="min-h-screen">
      <ProfileInfo user={activityId.users[0]} />
      <div className="px-3 py-6">
        <div className="bg-background space-y-3">
          <h2 className="text-lg">{activityId.name}</h2>
          <p className="text-sm">Participants:</p>
          <ul className="flex flex-col gap-3">
            {activityId.users.map(user => 
              <li key={user.id} className="flex justify-between items-center p-2 bg-white text-background rounded-md">
                <div className="flex items-center space-x-2">
                  <FaUser size={26} className="inline-block" />
                  <p>{user.firstname} {user.lastname}</p>
                </div>
                <p>{user.age} år</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}