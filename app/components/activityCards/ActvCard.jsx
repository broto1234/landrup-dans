
import Image from "next/image";
// import { addUserToActivity } from "@/app/lib/dal";
import AddActivity from "./AddActivity";

export default function ActvCard({ activity }) {
  console.log("ActvCard received activity:", activity);
  
  return (
    <div className="">
      <div className="relative">
        <Image
          src={activity.asset.url}
          alt={activity.name}
          width={400}
          height={100}
          className="w-full h-75 md:h-200 object-cover"  
        />
        <AddActivity activityId={activity.id} />
        {/* <form action={async () => await addUserToActivity(activity.id)} className="w-40 absolute bottom-6 right-10 bg-background text-xs text-center px-8 py-2 rounded-sm">
          <button type="submit">Tilmeld</button>
        </form> */}
      </div>
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xs">{activity.name}</h2>
            <p className="text-xs">{activity.minAge < 14 ? `${activity.minAge} - ${activity.maxAge} år` : `${activity.minAge}+ år`}</p>
          </div>
          <div>
            <p className="text-xs capitalize">{activity.weekday}</p>
            <p className="text-[12px]">{activity.time}</p>
          </div>
        </div>
        <p className="text-xs mt-4">{activity.description}</p>
      </div>
    </div>
  );
}