import { useLocation } from "react-router-dom";
import AllergiesOptions from "./Allergies";
import DietOptions from "./Diets";
import { useRecipes } from "./RecipeContext";

export default function RecipeFiltering() {
  const { dispatch } = useRecipes();

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className={`absolute right-[-2rem] left-2 pl-1 flex ${
        currentPath === "/recipes" ? "top-0" : "top-[-23rem]"
      } 
    flex-wrap justify-between gap-6 bg-white bg-white shadow-lg`}
    >
      <button
        onClick={() => dispatch({ type: "filterToggle" })}
        className="absolute right-1 bottom-1 text-secondary p-2 bg-grey shadow-md rounded-xl"
      >
        Done
      </button>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
      </svg> */}
      <DietOptions />
      <AllergiesOptions />
    </div>
  );
}
