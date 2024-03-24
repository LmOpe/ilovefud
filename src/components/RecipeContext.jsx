/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "setQuery":
      if (action.payload.length > 2)
        return { ...state, searchQuery: action.payload, isValid: true };
      return { ...state, searchQuery: action.payload, isValid: false };

    case "setDiet":
      if (state.diets.includes(action.payload)) {
        return {
          ...state,
          diets: state.diets.filter((item) => item !== action.payload),
        };
      } else {
        return { ...state, diets: [...state.diets, action.payload] };
      }

    case "setAllergies":
      if (state.allergies.includes(action.payload)) {
        return {
          ...state,
          allergies: state.allergies.filter((item) => item !== action.payload),
        };
      } else {
        return { ...state, allergies: [...state.allergies, action.payload] };
      }

    case "filterToggle":
      return { ...state, isFilterOpen: !state.isFilterOpen };

    case "setLoading":
      return { ...state, isLoading: action.payload };

    case "setRecipes":
      if (action.payload.check === 0) {
        return {
          ...state,
          isLoading: false,
          recipes: [
            {
              id: action.payload.id,
              title: action.payload.title,
              summary: action.payload.summary,
              img: action.payload.img,
              instructions: [...action.payload.instructions],
              ingredients: [...action.payload.ingredients],
            },
          ],
        };
      }
      return {
        ...state,
        isLoading: false,
        recipes: [
          ...state.recipes,
          {
            id: action.payload.id,
            title: action.payload.title,
            summary: action.payload.summary,
            img: action.payload.img,
            instructions: [...action.payload.instructions],
            ingredients: [...action.payload.ingredients],
          },
        ],
      };
  }
}

const initialState = {
  searchQuery: "",
  isFilterOpen: false,
  isLoading: false,
  isValid: false,
  diets: [],
  allergies: [],
  recipes: [],
};
const RecipeContext = createContext();

function RecipeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
}

function useRecipes() {
  const context = useContext(RecipeContext);
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { RecipeProvider, useRecipes };
