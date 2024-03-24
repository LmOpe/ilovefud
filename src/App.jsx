//import { Route, Routes, BrowserRouter } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecipeProvider } from "./components/RecipeContext";
import Homepage from "./pages/Homepage";
import Recipes from "./pages/Recipes";
import SavedRecipes from "./pages/SavedRecipes";
import ShoppingList from "./pages/ShoppingList";
import PageNotFound from "./pages/PageNotFound";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <div className="max-w-[425px] h-[100vh] bg-white mx-auto flex justify-center">
      <RecipeProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="recipe" element={<RecipeDetails />} />
            <Route path="saved-recipes" element={<SavedRecipes />} />
            <Route path="shopping-list" element={<ShoppingList />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </RecipeProvider>
    </div>
  );
}

export default App;
