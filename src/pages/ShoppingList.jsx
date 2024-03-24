import { useState } from "react";
import Header from "../components/Header";

function ShoppingList() {
  return (
    <div className="w-full">
      <Header />
      <ListItem />
    </div>
  );
}

function ListItem() {
  const [shouldReRender, setShouldReRender] = useState(false);

  const ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];

  return (
    <div className="m-5">
      <p className="text-primary text-center">
        <b>Shopping list of ingredients</b>
      </p>
      {ingredients.length < 1 ? (
        <p className="p-5 text-oriental text-secondary font-bold">Shopping list is empty ☹</p>
      ) : (
        <div className="mt-5">
          {ingredients.map((ing, ind) => {
            return (
              <div className="flex gap-5 items-center" key={ind}>
                <button>
                  {ing.isPurchased ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-square fill-light1"
                      viewBox="0 0 16 16"
                      onClick={() =>
                        markIngredient(ing, ingredients, setShouldReRender)
                      }
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                      <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-square fill-light1"
                      viewBox="0 0 16 16"
                      onClick={() =>
                        markIngredient(ing, ingredients, setShouldReRender)
                      }
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    </svg>
                  )}
                </button>
                <p
                  className={`${
                    ing.isPurchased && "line-through"
                  } text-orval text-primary`}
                  onClick={() =>
                    markIngredient(ing, ingredients, setShouldReRender)
                  }
                >
                  {ing.name}
                </p>
                <svg
                  onClick={() =>
                    removeIngredient(ing, ingredients, setShouldReRender)
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="red"
                  className="bi bi-x-square cursor-pointer active:scale-75"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function markIngredient(ing, ingredients, setShouldReRender) {
  const updatedIngredients = ingredients.map((ingre) => {
    if (ingre.name === ing.name) {
      return { ...ingre, isPurchased: !ingre.isPurchased };
    }
    return ingre;
  });

  localStorage.setItem("ingredients", JSON.stringify(updatedIngredients));

  setShouldReRender((x) => !x);
}

function removeIngredient(ing, ingredients, setShouldReRender) {
  localStorage.setItem(
    "ingredients",
    JSON.stringify([...ingredients.filter((ingre) => ingre.name !== ing.name)])
  );
  setShouldReRender((x) => !x);
}
export default ShoppingList;
