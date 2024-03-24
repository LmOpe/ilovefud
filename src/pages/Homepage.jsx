import AppDescription from "../components/AppDescription";
import FoodQuote from "../components/FoodQuote";
import Header from "../components/Header";
import SearchRecipe from "../components/SearchRecipe";

function Homepage() {
  return (
    <div>
      <Header />
      <FoodQuote />
      <AppDescription />
      <SearchRecipe />
    </div>
  );
}

export default Homepage;
