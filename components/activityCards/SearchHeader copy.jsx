"use client";

// import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export default function SearchHeader() {

  // const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // const query = searchParams.get("query");
  // const [searchTeam, setSearchTeam] = useState(query || "");

  const handleChange = (e) => {
    // setSearchTeam(e.target.value);
    const eventValue = e.target.value;
    if (eventValue) {
      router.push(`${pathname}?query=${eventValue}`);
    } else {
      router.push(pathname);
    }
    // router.replace(`${pathname}?query=${e.target.value}`);
    // router.push(`${pathname}?query=${e.target.value}`);
  };

  // const [expanded, setExpanded] = useState(false);
  // const showInput = () => {
  //   setExpanded(!expanded);
  // }

  return (
    <form className="focus-within:bg-secondary/40 flex m-5">
        <input
          type="search"
          name="query"
          onChange={handleChange}
          placeholder="Søg efter aktiviteter..."
          className="w-full text-2xl"
          />
      <button type="submit">
        <FiSearch size={40} />
      </button>
      </form>
      
      // <div className={`flex items-center justify-self-end px-2 py-2 ${expanded ? "bg-cyan-900" : "bg-transparent"} transition-all duration-300 ease-in-out rounded-[0.5em_0.5em_0em_0.5em]`}>
      // <form className={`${expanded ? "w-full px-2" : "w-0 px-0"} bg-transparent text-foreground focus:outline-none`}>
      //   <input
      //     type="search"
      //     name="query"
      //     // placeholder="Søg efter aktiviteter..."
      //     className="w-full text-2xl"
      //   />
      // {/* </form> */}
      //   {/* <button type="submit" onClick={showInput}>
      //     <FiSearch size={40} />
      //   </button> */}
      //   </div>
  )
}