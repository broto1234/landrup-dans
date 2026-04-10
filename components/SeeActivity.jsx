import Link from "next/link";

export default function SeeActivity( {activityId} ) {
  return (
    <div className="w-30 bg-bgColor text-white text-xs text-center px-2 py-2 rounded-sm shadow-md shadow-zinc-700 mt-2"> 
      <Link href={`/activities/${activityId}`}>See Activity</Link>
    </div>
  );
}