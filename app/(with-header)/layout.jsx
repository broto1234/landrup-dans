import Header from "../components/Header";

export default function WithHeaderLayout({ children }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <main className="absolute top-8 left-0 w-full flex min-h-screen items-center justify-center font-sans bg-background text-foreground"> 
        {children}
      </main>
    </div>
  );
}