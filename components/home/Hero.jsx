import Link from "next/link";
import { cookies } from "next/headers";
import LogoutUI from "../logout/LogoutUI";
import LogoutAction from "@/actions/actions";
import { getTokens } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Hero() {
  const { token} = await getTokens();
  // const cookiesStore = await cookies();
  // const token = cookiesStore.get("accessToken")?.value;

  return (
    <section className="text-white w-full h-110 -mt-8 flex items-center justify-center">
        <div className="w-full h-full pb-10 flex flex-col items-center justify-end space-y-2 bg-[url('/heroimg.jpg')] bg-center bg-cover bg-no-repeat">
        <div className="flex justify-between gap-2">
          <Link href="/activities" className="bg-bgColor text-white text-xs px-6 py-2 rounded">
            Activities
          </Link>
          {token ? (
              <LogoutUI logoutAction={LogoutAction}/>
            ) : (
              <Link href="/login" className="bg-bgColor text-white text-xs px-6 py-2 rounded">
                Log in
              </Link>
            )
          }
        </div>
        </div>
    </section>
  );
}