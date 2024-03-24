import { Link, useLocation } from "react-router-dom";

/* eslint-disable react/prop-types */
function RecipeItems({ recipes, setShouldReRender }) {
  return (
    <div className="flex mt-10 mx-2 flex-wrap justify-center gap-5">
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.id}
          name={recipe.title}
          ingredientsNum={recipe.ingredients.length}
          img={recipe.img}
          id={recipe.id}
          setShouldReRender={setShouldReRender}
        />
      ))}
    </div>
  );
}

function Recipe({ name, ingredientsNum, img, id, setShouldReRender }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="p-1 border border-secondary rounded-lg cursor-pointer">
      <Link to={`/recipe/?recipe=${name}`}>
        <img width={150} className="rounded-lg" src={img} alt={name} />
        <p className="w-[150px] bg-grey text-center text-secondary mt-2">
          {name}
        </p>
        <p className="w-[150px] bg-grey text-center text-secondary mt-2">
          {ingredientsNum} ingredients
        </p>
      </Link>
      {path === "/saved-recipes" && (
        <button
          onClick={() => removeRecipe(id, setShouldReRender)}
          className="p-2 mt-2 bg-secondary text-white w-full rounded-md shadow-sx"
        >
          remove recipe
        </button>
      )}
    </div>
  );
}

function removeRecipe(id, setShouldReRender) {
  const recipes = JSON.parse(localStorage.getItem("recipes"));

  localStorage.setItem(
    "recipes",
    JSON.stringify([...recipes.filter((recipe) => recipe.id !== id)])
  );
  setShouldReRender((x) => !x);
  alert("Recipe removed");
}
export default RecipeItems;
