import ActvCard from "../../../components/activityCards/ActvCard";
import { getSingleActivity } from "../../../lib/dal";

export default async function ActivityPage({ params }) {
  const { id } = await params;
  const activityId = await getSingleActivity(id);
  console.log("Activity data:", activityId);
  return (
    <main>
      <ActvCard activity={activityId} />
    </main>
  );
}