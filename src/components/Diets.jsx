import FilterOptions from "./FilterOptions";

const diets = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30",
];

export default function DietOptions() {
  return <FilterOptions title={"Diets"} type={diets} actionType={'setDiet'} />;
}
