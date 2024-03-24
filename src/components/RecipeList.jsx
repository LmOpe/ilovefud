import RecipeItems from "./RecipeItems";
import { useRecipes } from "./RecipeContext";

function RecipeList() {
  const { state } = useRecipes();
  const { recipes } = state;

  return <RecipeItems recipes={recipes} />;
}

export default RecipeList;
