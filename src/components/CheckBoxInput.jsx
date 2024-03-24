import { useRecipes } from "./RecipeContext";

/* eslint-disable react/prop-types */
function CheckBoxInput({ option, type }) {
  const { state, dispatch } = useRecipes();
  const { diets, allergies } = state;

  return (
    <label className="inline-flex items-center gap-2 w-1/2">
      <input
        type="checkbox"
        value={option}
        onChange={() => dispatch({ type: type, payload: option })}
        checked={diets?.includes(option) || allergies?.includes(option)}
        className="border border-primary
            appearance-none
            rounded w-4 h-4 
            checked:border-transparent checked:bg-green-500 
            focus:outline-none focus:ring-2 
            focus:ring-green-500 focus:ring-offset-2 
            shadow-[inset_0_1px_2px_0_rgba(0,0,0,1)]"
      />
      <span
        className={
          diets?.includes(option) || allergies?.includes(option)
            ? "text-primary"
            : ""
        }
      >
        {option}
      </span>
    </label>
  );
}

export default CheckBoxInput;
