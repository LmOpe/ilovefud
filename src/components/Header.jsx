import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="bg-header bg-cover bg-left bg-no-repeat">
      <NavBar />
    </div>
  );
}

export default Header;

function NavBar() {
  return (
    <div className="flex items-center backdrop-blur-md bg-[#FFFFFF66]">
      <NavLink to="/">
        <img src="/logo.png" alt="" />
      </NavLink>
      <p className="w-full flex justify-end p-4 pr-1 gap-6 font-bold tracking-wide">
        <NavLink
          className={({ isActive }) => (isActive ? "text-secondary" : "")}
          to={"/saved-recipes"}
        >
          Saved Recipes
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "text-secondary" : "")}
          to={"/shopping-list"}
        >
          Shopping list
        </NavLink>
      </p>
    </div>
  );
}
