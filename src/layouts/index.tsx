import Menu from "./asides/Menu";
import MenuSearch from "./asides/components/MenuSearch";
function Layout() {
  return (
    <div className="box-border fixed top-0 left-0 w-full h-screen flex">
      <aside className="box-border w-[268px] bg-aside-bg-color border-r-1 border-r-aside-border-color">
        <MenuSearch />
        <Menu />
      </aside>
      <main className="box-border flex-1 bg-white"></main>
    </div>
  );
}
export default Layout;
