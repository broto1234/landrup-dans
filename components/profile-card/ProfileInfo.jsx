import { FaUser } from "react-icons/fa6";
import LogoutUI from "../logout/LogoutUI";
import LogoutAction from "@/actions/actions";

export default function ProfileInfo({ user }) {
  
  return (
    <section className="flex flex-col justify-between items-center">
      <h1 className="text-lg py-4">My Profile</h1>
      <div className="w-full bg-white text-bgColor text-center pb-2">
        <FaUser className="text-5xl mx-auto my-2" />
        <p className="text-md font-semibold">{user.firstname} {user.lastname}</p>   
        <p className="text-sm">{user.role === "instructor" ? "Instructor" : "Member"}</p>  
        <LogoutUI logoutAction={LogoutAction} />   
      </div>   
    </section>
  )
}