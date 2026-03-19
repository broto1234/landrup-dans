import Image from "next/image";
import AddActivity from "./AddActivity";
import ActivityCardInfo from "./ActivityCardInfo";
// import { addUserToActivity } from "@/app/lib/dal";

export default function ActvCard({ user, activity, isUserEnrolled }) {
  console.log("ActvCard received activity:", activity);
  console.log("Is user enrolled:", isUserEnrolled);
  
  return (
    <div className="">
      <div className="relative">
        <Image
          src={activity.asset.url}
          alt={activity.name}
          width={400}
          height={100}
          className="w-full h-[60vh] md:h-200 object-cover"  
        />
        <AddActivity user={user} activity={activity} isUserEnrolled={isUserEnrolled} />
      </div>
      <ActivityCardInfo activity={activity} />
    </div>
  );
}