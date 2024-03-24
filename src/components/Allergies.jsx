import FilterOptions from "./FilterOptions";

const allergies = [
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Sulfite",
  "Tree Nut",
  "Wheat",
];

function AllergiesOptions() {
  return <FilterOptions title={"Allergies"} type={allergies} actionType={'setAllergies'} />;
}

export default AllergiesOptions;
