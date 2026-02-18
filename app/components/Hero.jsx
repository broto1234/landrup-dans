import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-black text-white w-full h-96 flex items-center justify-center">
      <div className="bg-[url('/heroimg.jpg')] bg-center bg-cover bg-no-repeat w-full h-full"></div>
      <div className="absolute top-10 right-10 flex flex-col justify-between items-center h-80">
        <div className="w-full space-y-1 flex flex-col items-end justify-center">
          <div>
            <img src="/Group 8.svg" alt="Group 8" className="w-10 h-10 self-center" />
            <img src="/Group 6.svg" alt="Group 6" className="w-42 h-auto" />
          </div>
          <img src="/Rectangle 19.svg" alt="Group 7" className="w-full h-2" />
        </div>
        <div className="w-full flex flex-col items-center justify-end space-y-2">
          <Link href="/about" className="bg-white text-black text-xs px-10 py-2 rounded">
            Log ind her
          </Link>
          <img src="/Vector.svg" alt="vector" className="w-6" />
        </div>
      </div>
    </section>
  );
}