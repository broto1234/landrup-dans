import { getAllActivities } from "../../lib/dal";
import ActivitiesCard from "../../components/activityCards/ActvsCard";

export default async function Activities() {
  const activities = await getAllActivities();
  console.log("Activities data:", activities);

  return (
    <main className="min-h-screen mt-6 px-3">
      <ActivitiesCard activities={activities} />
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
        {activities.map((activity) => (
         <ActivitiesCard key={activity.id} activity={activity} />
        ))}
      </div> */}
    </main>
  );  
}