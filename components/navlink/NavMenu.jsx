import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import NavLink from "./NavLink";

import { BiHomeAlt } from "react-icons/bi";
import { IoIosList } from "react-icons/io";
import { FaUser } from "react-icons/fa6";

export default async function NavMenu() {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("accessToken")?.value;
    const decode = jwt.decode(accessToken);
    const role = decode?.data?.role;
    let profileLink = "/user";  // Default fallback link

    if (role === "instructor") {
      profileLink = "/instructor";
    }
    // console.log("Decoded token in NavMenu:", decode);
    

  return (
    <nav className="flex justify-between px-3 py-2 bg-foreground text-[10px]">
      <NavLink href="/"><div className="flex flex-col items-center"><BiHomeAlt size={30} /></div></NavLink>
      <NavLink href="/activities"><div className="flex flex-col items-center justify-center"><IoIosList size={30} /></div><p>Aktiviteter</p></NavLink>
      <NavLink href={profileLink}><div className="flex flex-col items-center"><FaUser size={30} /></div><p>Profile</p></NavLink>
    </nav>
  );  
}