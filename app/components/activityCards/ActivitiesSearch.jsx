"use client";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function ActivitiesSearch({ activities, filteredItems }) {

  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredActivities = activities.filter(activity => {
      const name = activity.name.toLowerCase().includes(searchTerm.toLowerCase());
      const weekday = activity.weekday.toLowerCase().includes(searchTerm.toLowerCase());
      return name || weekday;
    });
    filteredItems(filteredActivities);
    console.log("Filtered activities:", filteredActivities);

  }, [searchTerm, activities]);

  return (
    <div className={`relative flex items-center justify-end px-2 py-1 ${expanded ? "bg-cyan-900" : "bg-transparent"} transition-all duration-300 ease-in-out rounded-[0.5em_0.5em_0em_0.5em]`}>
      <input 
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`transition-all duration-300 ease-in-out ${expanded ? "w-full px-2" : "w-0 px-0"} bg-transparent text-foreground focus:outline-none`}
      />  
      <button onClick={() => setExpanded(!expanded)}>
        <FiSearch size={20} />
      </button>
    </div>
  );
} 