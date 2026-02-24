import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="text-white w-full h-110 -mt-8 flex items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-end space-y-2 bg-[url('/heroimg.jpg')] bg-center bg-cover bg-no-repeat">
          <Link href="/login" className="bg-white text-black text-xs px-10 py-2 rounded">
            Log ind her
          </Link>
          <Image src="/Vector.svg" alt="vector" width={24} height={24} className="w-6 pb-2" />
        </div>
    </section>
  );
}