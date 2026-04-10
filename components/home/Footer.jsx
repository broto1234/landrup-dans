import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-4 mt-8 text-center text-xs">
      <Image src="/Group 8.svg" alt="Logo" width={70} height={70} className="mx-auto mb-2" />
      <h2 className="text-lg font-semibold">Dance School</h2>
      <div className="flex flex-col mt-2 text-xs">
        <span className="tracking-wider">Place 1A . 1000 Denmark</span>
        <span className="">Tlf: 1234 5678</span>
      </div>
    </footer>
  );
}