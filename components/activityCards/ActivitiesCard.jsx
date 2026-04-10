import ActivitiesFiltered from "./ActivitiesFiltered";

export default function ActivitiesCard({ filteredActivities }) {

  return (
      <div className="grid grid-cols-1 gap-4 pb-2">
        <h1 className="text-2xl">Activities</h1>
        <ActivitiesFiltered activities={filteredActivities} />  
      </div>
  );
}