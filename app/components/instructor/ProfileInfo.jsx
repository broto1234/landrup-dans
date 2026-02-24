import { FaUser } from "react-icons/fa6";

export default function ProfileInfo({ user }) {
  console.log("ProfileInfo user prop:", user);
  return (
    <section className="flex flex-col justify-between items-center">
      <h1 className="text-lg py-4">Min profil</h1>
      <div className="w-full bg-white text-background text-center pb-2">
        <FaUser className="text-5xl mx-auto my-2" />
        <p className="text-md font-semibold">{user.firstname} {user.lastname}</p>   
        <p className="text-sm">{user.role === "instructor" ? "Instruktør" : "Medlem"}</p>  
      </div>
      
    </section>
  )
}