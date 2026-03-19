import { holdtyperData } from "../../holdtyperData";

export default function Holdtyper() {
  return (
    <section className="my-4 px-4">  
      <h2 className="text-md">Vores holdtyper</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {holdtyperData.map((hold) => (
          <div key={hold.id} className="">
              <h3 className="text-xs font-semibold mb-2">{hold.name}</h3>
            <img src={hold.image} alt={hold.name} className="w-full h-48 object-cover" />
              <p className="text-[0.55rem] mt-2">{hold.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}