
import ActivitiesFiltered from "./ActivitiesFiltered";

export default function ActivitiesCard({ filteredActivities }) {
  console.log("ActivitiesCard received filtered activities:", filteredActivities);
  // const [filtered, setFiltered] = useState(activities);

  return (
      <div className="grid grid-cols-1 gap-4 pb-2">
        <h1 className="text-2xl">Aktiviteter</h1>
        {/* <ActivitiesFiltered activities={activities} /> */}
        <ActivitiesFiltered activities={filteredActivities} />  
      </div>
  );
}