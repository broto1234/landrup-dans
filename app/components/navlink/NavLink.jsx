"use client"; 
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href || 
  (href === "/activities" && pathname.startsWith("/activities/")) ||
  (href === "/instructor" && pathname.startsWith("/instructor/"));
  
  return (
    <Link href={href} className={isActive ? "text-background" : "text-background/50"}>
      {children}
    </Link>
  );
}