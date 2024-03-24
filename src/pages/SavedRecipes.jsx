import Header from "../components/Header";
import StoredRecipeList from "../components/StoredRecipeList";

function SavedRecipes() {
  return (
    <div className="w-full">
      <Header />
      <StoredRecipeList />
    </div>
  );
}

export default SavedRecipes;
