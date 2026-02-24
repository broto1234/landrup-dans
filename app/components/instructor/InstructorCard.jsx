import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

export default function InstructorCard({ activities }) {
  console.log("InstructorCard activities:", activities);

  return (
    <ul className="space-y-3">
            {activities.length > 0 ? (
              activities.map(activity => (
                <li key={activity.id} className="p-4 bg-blue-100 text-black rounded space-y-2">  
                  <h2 className="text-lg font-semibold">{activity.name}</h2>
                  <p className="text-sm"><span className="capitalize">{activity.weekday}</span> <span>kl. {activity.time}</span></p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Max. participants: {activity.maxParticipants}</p>
                    <p className="text-sm">Registered: {activity.users?.length || 0}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <Link href={`/instructor/${activity.id}`} className="text-sm px-6 py-2 bg-background text-white rounded-md shadow-lg/80 shadow-gray-800">Detail list</Link>
                    <div className="flex space-x-2">
                        <FaEdit size={40} className="inline-block cursor-pointer text-white px-2 py-2 bg-background rounded hover:bg-green-700"/>
                        <AiOutlineDelete size={40} className="inline-block cursor-pointer text-white px-2 py-2 bg-background rounded hover:bg-red-500" />
                    </div>
                  </div>
                </li>
              ))  
            ) : (
              <li>No activities available</li>
            )}
          </ul>
  )}