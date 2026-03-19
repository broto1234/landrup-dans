"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export default function SearchHeader() {

  const [isShownInput, setIsShownInput] = useState(false);

  const router = useRouter();  // Get the router instance
  const pathname = usePathname();  // Get the current pathname

  const handleChange = (e) => {
    const eventValue = e.target.value;

    if (eventValue) {
      router.replace(`${pathname}?query=${eventValue}`);  // Navigate to the same pathname with the query parameter
    } else {
      router.replace(pathname);
      // router.push(pathname);
    }
  };

  const toggleShownInput = () => {
    setIsShownInput(!isShownInput);
  }

  return (
    <div className={`flex items-center justify-self-end px-2 py-2 ${isShownInput ? "bg-cyan-900" : "bg-transparent"} transition-all duration-300 ease-in-out rounded-[0.5em_0.5em_0em_0.5em]`}>
      <form  className={`${isShownInput ? "w-full px-2" : "w-0 px-0"} bg-transparent text-foreground focus:outline-none`}>
          <input
            type="search"
            name="query"
            onChange={handleChange}
            placeholder="Søg efter aktiviteter..."
            className="w-full text-2xl"
            />
      </form>
      <FiSearch size={40} onClick={toggleShownInput}/>
    </div>
  )
}