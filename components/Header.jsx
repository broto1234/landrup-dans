import Image from "next/image";

export default function Header() {
  return (
    <section className="absolute top-10 right-16 space-y-1 flex flex-col items-end justify-center z-111">
      <div className="flex flex-col gap-2">
        <Image src="/Group 8.svg" alt="Group 8" width={40} height={40} className="self-center" />
        <Image src="/Group 6.svg" alt="Group 6" width={168} height={40} className="" />
      </div>
      <Image src="/Rectangle 19.svg" alt="Rectangle 19" width={120} height={1} className="w-full h-2" />
    </section>
  );};