import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllActivities } from "@/lib/dal";
import { getUserById } from "@/actions/actions";
import InstructorActivities from "@/components/instructor/InstructorActivities";
import ProfileInfo from "@/components/instructor/ProfileInfo";

export default async function InstructorPage() {
  const cookiesStore =  await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  if (!accessToken) {
    redirect("/login");
  }
  const user = await getUserById();
  // const user = JSON.parse(accessToken);
  console.log("User from token:", user);

  const activities = await getAllActivities();
  console.log("Activities data:", activities);

  const InstructorFilteredActivities = activities.filter(activity => activity.instructorId === Number(user.id));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProfileInfo user={user} />
      <InstructorActivities activities={InstructorFilteredActivities} />
    </div>
  );
}