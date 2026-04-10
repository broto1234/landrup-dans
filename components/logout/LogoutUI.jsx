"use client";

export default function LogoutUI({ logoutAction }) {  

  return (
    <div className="relative">
        <form action={logoutAction}>
          <button 
            type="submit" 
            className="bg-bgColor text-white text-xs px-6 py-2 rounded cursor-pointer"
          >
            Logout
          </button>
        </form>
    </div>
  );
}
