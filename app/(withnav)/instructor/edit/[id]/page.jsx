import { activityById } from "@/services/activities/activityById-service";
import EditActivityForm from "@/components/forms/edit-activity-form/EditActivityForm";

export default async function EditPage({ params }) {

  const { id } = await params;
  const paramsId = Number(id);

  const activity = await activityById(paramsId);
  // console.log("Fetched activity for editing:", activity);
  
  return <EditActivityForm activityId={paramsId} activity={activity} />;
}