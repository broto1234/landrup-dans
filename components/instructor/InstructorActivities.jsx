import { FiPlus } from "react-icons/fi";
import InstructorCard from "./InstructorCard";

export default function InstructorActivities({ activities }) {
  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center">
        <h2 className="mb-3">Mine hold</h2>
        <FiPlus size={28}  className="p-1 bg-white text-black rounded-md cursor-pointer hover:text-white hover:bg-blue-700"/>
      </div>
      <InstructorCard activities={activities} />
      </div>
  )
}