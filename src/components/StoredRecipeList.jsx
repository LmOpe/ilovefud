import { useEffect, useState } from "react";
import RecipeItems from "./RecipeItems";
import { useRecipes } from "./RecipeContext";
import { Link, useNavigate } from "react-router-dom";

function StoredRecipeList() {
  const { dispatch } = useRecipes();
  const recipes = JSON.parse(localStorage.getItem("recipes"));
  const navigate = useNavigate();
  const [ShouldReRender, setShouldReRender] = useState(false);

  useEffect(function storeRecipe() {
    let check = 0;

    if (recipes) {
      recipes.forEach((result) => {
        dispatch({
          type: "setRecipes",
          payload: {
            check: check,
            id: result.id,
            img: result.img,
            instructions: result.instructions,
            ingredients: result.ingredients,
            title: result.title,
            summary: result.summary,
          },
        });
        check++;
      });
    }
  }, []);

  return (
    <div className="flex">
      <button
        className="p-2 self-start"
        onClick={() => {
          navigate(-1);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-arrow-left-circle text-seclight1 shadow-lg active:scale-75"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
          />
        </svg>
      </button>
      {recipes?.length > 0 ? (
        <RecipeItems recipes={recipes} setShouldReRender={setShouldReRender} />
      ) : (
        <p className="p-5 font-oriental text-xl ">
          There is no saved recipe yet. Get your favorite recipes,{" "}
          <span className="text-secondary underline">
            <Link to={"/"}>here</Link>
          </span>
        </p>
      )}
    </div>
  );
}

export default StoredRecipeList;
