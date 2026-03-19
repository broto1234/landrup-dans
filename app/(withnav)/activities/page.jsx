import { getAllActivities } from "@/lib/dal";
import SearchHeader from "@/components/activityCards/SearchHeader";
import ActivitiesCard from "@/components/activityCards/ActvsCard";

export default async function Activities( { searchParams }) {

  const { query } = await searchParams;
  
  const activities = await getAllActivities();
  console.log("Activities data:", activities);

  const filteredActivities = query ?
    activities.filter(activity => {      
      const nameSearch = activity.name.toLowerCase().includes(query.toLowerCase());
      const weekdaySearch = activity.weekday.toLowerCase().includes(query.toLowerCase());
      return nameSearch || weekdaySearch;
    })
  : 
    activities;

  return (
    <main className="min-h-screen mt-6 px-3">
      <SearchHeader />
      <ActivitiesCard filteredActivities={filteredActivities} />
    </main>
  );  
}