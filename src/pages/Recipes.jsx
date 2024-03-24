import Header from "../components/Header";
import { useRecipes } from "../components/RecipeContext";
import RecipeList from "../components/RecipeList";
import RecipeNotFound from "../components/RecipeNotFound";
import SearchRecipe from "../components/SearchRecipe";

function Recipes() {
  const { state } = useRecipes();
  const { recipes } = state;

  return (
    <div className="w-full">
      <Header />
      <SearchRecipe />
      {recipes.length > 0 ? <RecipeList /> : <RecipeNotFound />}
    </div>
  );
}

export default Recipes;
