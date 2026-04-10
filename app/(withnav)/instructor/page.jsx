import { requireTokens } from "@/lib/auth";
import { userById } from "@/services/users/userById-service";
import { allActivities } from "@/services/activities/allActivities-service";
import ProfileInfo from "@/components/profile-card/ProfileInfo";
import InstructorCard from "@/components/instructor/InstructorCard";

export default async function InstructorPage() {
  const { token, userId } = await requireTokens();
  const user = await userById(userId, token);  

  const activities = await allActivities();

  const InstructorFilteredActivities = activities.filter(
    activity => activity.instructorId === Number(user.id)
  );
  
  return (
    <div className="min-h-screen bg-bbColor text-foreground">
      <ProfileInfo user={user} />
      <InstructorCard activities={InstructorFilteredActivities}/>
    </div>
  );
}