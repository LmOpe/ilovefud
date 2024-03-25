/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { useRecipes } from "../components/RecipeContext";
import { useState } from "react";

function RecipeDetails() {
  const [shouldReRender, setShouldReRender] = useState(false);

  return (
    <div className="w-full flex flex-col gap-5">
      <Header />
      <Details setShouldReRender={setShouldReRender} />
    </div>
  );
}

function Details({ setShouldReRender }) {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("recipe");
  const { state } = useRecipes();
  const navigate = useNavigate();
  const { recipes } = state;

  let recipe = recipes?.filter((recipe) => recipe?.id === parseInt(param))[0];
  
  if(!recipe){
    recipe = JSON.parse(localStorage.getItem("recipes")).filter((rec) => rec?.title === param)[0];
  }
  return (
    <div className="flex flex-col items-center pt-0 p-5">
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
      <img
        width={400}
        className="rounded-lg"
        src={recipe?.img}
        alt={recipe?.title}
      />
      <p className="text-primary font-oriental my-2">{recipe?.title}</p>
      <p
        className="font-oriental"
        dangerouslySetInnerHTML={{ __html: recipe?.summary }}
      />
      <RecipeInfo
        items={recipe?.ingredients}
        type={"ing"}
        setShouldReRender={setShouldReRender}
      />
      <RecipeInfo items={recipe?.instructions} type={"inst"} />
      {!JSON.parse(localStorage.getItem("recipes"))?.some(
        (rec) => rec?.id === recipe?.id
      ) && (
        <button
          onClick={() => storeRecipe(recipe, setShouldReRender)}
          className="p-3 bg-primary text-white w-2/3 rounded-md shadow-sx"
        >
          Save recipe
        </button>
      )}
    </div>
  );
}

function storeRecipe(recipe, setShouldReRender) {
  const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
  setShouldReRender((x) => !x);
  localStorage.setItem("recipes", JSON.stringify([...existingRecipes, recipe]));
  alert("Recipe saved successfully");
}

function RecipeInfo({ items, type, setShouldReRender }) {
  const ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];

  return (
    <div className="my-3 font-arvo">
      <b>{type === "ing" ? "Ingredients" : "Instructions"}</b>
      <ul>
        {items?.map((item, ind) => {
          return (
            <li className="text-md my-2" key={ind}>
              {type === "ing" ? (
                <p>
                  <b className="mr-2 text-xl text-primary">-</b>
                  {item?.detail}
                  <br />
                  {!ingredients?.some((ing) => ing?.name === item?.name) && (
                    <button
                      onClick={() =>
                        storeIngredients(item, ingredients, setShouldReRender)
                      }
                      className="p-2 bg-grey rounded-md text-primary text-xs"
                    >
                      Add to shopping list
                    </button>
                  )}
                </p>
              ) : (
                <p>
                  <b className="mr-2 text-primary">{item?.number}</b>
                  {item?.step}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function storeIngredients(ing, ingredients, setShouldReRender) {
  localStorage.setItem("ingredients", JSON.stringify([...ingredients, ing]));
  setShouldReRender((x) => !x);
}
export default RecipeDetails;
