import Hero from "./components/Hero";
import Holdtyper from "./components/Holdtyper";
import Nyhedsbrev from "./components/Nyhedsbrev";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-background text-foreground">
      <main className="flex min-h-screen w-full flex-col">
        <Hero />  
        <Holdtyper />    
        <Nyhedsbrev />  
      </main>
    </div>
  );
}
