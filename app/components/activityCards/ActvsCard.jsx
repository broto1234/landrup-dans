"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ActivitiesSearch from "./ActivitiesSearch";
import ActivitiesFiltered from "./ActivitiesFiltered";

export default function ActivitiesCard({ activities }) {
  const [filtered, setFiltered] = useState(activities);

  return (
      <div className="grid grid-cols-1 gap-4 pb-2">
        <ActivitiesSearch activities={activities} filteredItems={setFiltered} />
        <h1 className="text-2xl">Aktiviteter</h1>
        <ActivitiesFiltered filtered={filtered} />
      </div>
  );
}