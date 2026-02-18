export default function Nyhedsbrev () {
  return (  
    <section className="my-4 px-4">
      <h2 className="text-md">Nyhedsbrev</h2>
      <p className="text-[0.55rem] mt-2">Få direkte besked når vi har sæsonstart eller afholder arrangementer.</p>
      <form className="mt-4 flex items-center space-x-2">
        <input
          type="email"
          placeholder="Email"
          className="w-36 px-2 py-1 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-gray-700 bg-white text-xs text-gray-500"
          // className="w-36 px-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="p-2 bg-white text-xs text-black rounded-sm hover:bg-red-400 hover:text-foreground">
          Tilmeld
        </button> 
      </form>
    </section>
  );
}