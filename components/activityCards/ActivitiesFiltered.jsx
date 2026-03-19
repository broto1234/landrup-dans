import Image from "next/image";
import Link from "next/link";

export default function ActivitiesFiltered({ activities }) {
  console.log("ActivitiesFiltered received activities:", activities);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pb-2">
          {activities.length ? (
            activities.map((activity) => (
              <div key={activity.id} className="relative border-radius rounded-[1.5em_1.5em_0em_1.5em] overflow-hidden">
              <Link href={`/activities/${activity.id}`} key={activity.id}>
                <Image
                  src={activity.asset.url}
                  alt={activity.name}
                  width={400}
                  height={120}
                  className="w-full h-[40vh] md:h-[60vh] object-cover"  
                />
                <div className="absolute border-radius rounded-[0em_1.5em_0em_0em] bottom-0 left-0 right-0 bg-background/60 text-white px-10 py-8">
                  <h2 className="text-sm">{activity.name}</h2>
                  <p className="text-xs">{activity.minAge < 14 ? `${activity.minAge} - ${activity.maxAge} år` : `${activity.minAge}+ år`}</p>                  
                </div>
              </Link>
              </div>
            ))
            ) : (<p className="text-sm text-gray-500">No activities available.</p>
          )}
        </div>
  );
}