import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-4 mt-8 text-center text-xs">
      <Image src="/Group 8.svg" alt="Logo" width={70} height={70} className="mx-auto mb-2" />
      <h2 className="text-lg font-semibold">Landrup Dans</h2>
      <div className="flex flex-col mt-2 text-xs">
        <span className="tracking-wider">Pulsen 8 . 4000 Roskilde</span>
        <span className="">Tlf: 3540 4550</span>
      </div>
    </footer>
  );
}