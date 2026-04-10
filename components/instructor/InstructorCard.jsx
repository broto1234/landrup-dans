"use client";

import Link from "next/link";
import { FaEdit, FaPlus } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { removeActivity } from "@/actions/activities-actions";

export default function InstructorCard({ activities }) {
  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2>My Activities</h2>
        <Link href="/instructor/create-activity" className="text-xs p-2 bg-white text-bgColor rounded-md shadow-lg/80 shadow-gray-800 inline-flex items-center">
          <FaPlus className="mr-2" />
        </Link>
      </div>
      <ul className="space-y-4">
        {activities.length > 0 ? (
          activities.map(activity => (
            <li key={activity.id} className="p-4 bg-blue-100 text-black space-y-2">  
              <h2 className="text-lg font-semibold">{activity.name}</h2>
              <p className="text-sm"><span className="capitalize">{activity.weekday}</span> <span>kl. {activity.time}</span></p>
              <div className="flex justify-between items-center">
                <p className="text-sm">Max. participants: {activity.maxParticipants}</p>
                <p className="text-sm">Registered: {activity.users?.length || 0}</p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <Link href={`/instructor/${activity.id}`} className="text-sm px-6 py-2 bg-bgColor text-white rounded-md shadow-lg/80 shadow-gray-800">Detail list</Link>
                <div className="flex space-x-2">
                  <Link href={`/instructor/edit/${activity.id}`} className="text-sm px-6 py-2 bg-green-700 text-white rounded-md shadow-lg/80 shadow-gray-800 inline-flex items-center">
                    <FaEdit className="mr-2" />
                    Edit
                  </Link>
                  <form action={removeActivity.bind(null, activity.id)}>
                    <button className="text-sm px-6 py-2 bg-red-500 text-white rounded-md shadow-lg/80 shadow-gray-800 inline-flex items-center"> 
                      <AiOutlineDelete className="mr-2" />
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))  
          ) : (
            <li>No activities available</li>
          )
        }
      </ul>
    </section>
  )
}