import NavMenu from "../components/navlink/NavMenu";

export default function NoHeaderLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="">
        {children}
      </section>
      <NavMenu />
    </div>
  );
}