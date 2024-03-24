import Button from "./Button";
import CheckboxOptions from "../components/CheckboxOptions";
import { useRecipes } from "./RecipeContext";
import { useNavigate } from "react-router-dom";

function SearchRecipe() {
  const { state, dispatch } = useRecipes();
  const { searchQuery, isFilterOpen, diets, allergies } = state;
  const navigate = useNavigate();

  //const APIKEY = process.env.VITE_API_KEY;

  function handleSubmit(e) {
    e.preventDefault();

    if (searchQuery.length < 2) return;

    async function fetchRecipes() {
      try {
        dispatch({ type: "setLoading", payload: true });

        const res = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=37d9b78ba87a48209a37af696cb17efc&includeIngredients=${searchQuery}&diet=${
            diets.length > 0 ? diets.toString() : ""
          }&intolerances=${
            allergies.length > 0 ? allergies.toString() : ""
          }&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sort=max-used-ingredients&number=20`
        );

        const data = await res.json();
        if (data.results.length < 1) {
          alert(
            `Recipes with the ingredients, ${searchQuery}, could not be found.`
          );
          navigate(
            `/recipes?ingredients=${searchQuery}&diet=${
              diets.length > 0 ? diets.toString() : ""
            }&intolerances=${allergies.length > 0 ? allergies.toString() : ""}`
          );
          return;
        }
        let check = 0;

        data.results.forEach((result) => {
          const instructions = result.analyzedInstructions[0].steps.map(
            (inst) => ({ number: inst.number, step: inst.step })
          );
          const ingredients = result.extendedIngredients.map((ing) => ({
            name: ing.name,
            detail: ing.original,
            isPurchased: false,
          }));
          dispatch({
            type: "setRecipes",
            payload: {
              check: check,
              id: result.id,
              img: result.image,
              instructions,
              ingredients,
              title: result.title,
              summary: result.summary,
            },
          });
          check++;
        });

        dispatch({ type: "setQuery", payload: "" });

        navigate(
          `/recipes?ingredients=${searchQuery}&diet=${
            diets.length > 0 ? diets.toString() : ""
          }&intolerances=${allergies.length > 0 ? allergies.toString() : ""}`
        );
      } catch (err) {
        console.error(err);
        alert(
          "Something went wrong with fetching recipes, check your internet connection"
        );
      } finally {
        dispatch({ type: "setLoading", payload: false });
      }
    }

    fetchRecipes();
  }

  return (
    <div className="mt-8 flex">
      <form className="ml-2 flex flex-col w-[100%]" onSubmit={handleSubmit}>
        <label className="relative block h-[80px] w-[80%]" htmlFor="recipe">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Ingredients
          </span>
          <span className="absolute left-0 bottom-4 flex items-center pl-3">
            <svg
              className="h-5 w-5 fill-primary bi bi-search"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </span>
          <input
            id="recipe"
            type="text"
            value={searchQuery}
            placeholder="egg, cheese, tomtatoes..."
            onChange={(e) =>
              dispatch({ type: "setQuery", payload: e.target.value })
            }
            className="
            placeholder:italic placeholder:text-slate-400 
            block bg-white w-[100%] h-12 border border-light1 rounded-full 
            pl-9 pr-3 mt-1 shadow-sm focus:outline-none 
            focus:border-primary focus:ring-primary focus:ring-1 sm:text-sm"
          />

          <p
            className="text-primary absolute top-8 right-[-4rem] flex items-center"
            onClick={() => dispatch({ type: "filterToggle" })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-filter "
              viewBox="0 0 16 16"
            >
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
            </svg>
            <small>filter</small>
          </p>
          {isFilterOpen && <CheckboxOptions />}
        </label>
        <Button />
      </form>
    </div>
  );
}

export default SearchRecipe;
