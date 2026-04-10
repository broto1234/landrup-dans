import NavLink from "./NavLink";
import { BiHomeAlt } from "react-icons/bi";
import { IoIosList } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { getTokens } from "@/lib/auth";
import { userById } from "@/services/users/userById-service";

export default async function NavMenu() {

  const { token, userId } = await getTokens();
  
  let profileLink = "/login";

  try {
    const user = await userById(userId, token);
    profileLink = user?.role === "instructor" ? "/instructor" : "/user";
  } catch (error) {
    profileLink = "/login";
  }

  return (
    <nav className="flex justify-between px-3 py-2 bg-foreground text-[10px]">
      <NavLink href="/"><div className="flex flex-col items-center"><BiHomeAlt size={30} /></div></NavLink>
      <NavLink href="/activities"><div className="flex flex-col items-center justify-center"><IoIosList size={30} /></div><p>Activities</p></NavLink>
      <NavLink href={profileLink}><div className="flex flex-col items-center"><FaUser size={30} /></div><p>Profile</p></NavLink>
    </nav>
  );  
}