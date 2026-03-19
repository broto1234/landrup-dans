import Link from "next/link";

export default function VisHold( {activityId} ) {
  return (
    <div className="w-30 bg-background text-white text-xs text-center px-8 py-2 rounded-sm shadow-md shadow-zinc-700 mt-2"> 
      <Link href={`/activities/${activityId}`}>Vis hold</Link>
    </div>
  );
}