import { createContext, useContext, useReducer, useEffect } from "react"
import getRecipes from "../hooks/getRecipes"

const RecipeContext = createContext()

const initialState = {
  searchingForFood: "",
  printFood: [],
  printRecipes: [],
}

function reducer(state, action) {
  switch (action.type) {
    case "setSearchingForFood":
      return { ...state, searchingForFood: action.payload }
    case "setPrintFood":
      return { ...state, printFood: action.payload }
    case "setPrintRecipes":
      return { ...state, printRecipes: action.payload }
    default:
      throw new Error("Invalid action type")
  }
}

function RecipeProvider({ children }) {
  const [{ searchingForFood, printFood, printRecipes }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    const printFoodJoin = printFood.join(",")

    const fetchRecipes = async () => {
      const recipes = await getRecipes(printFoodJoin)
      dispatch({
        type: "setPrintRecipes",
        payload: recipes.hits.map((hit) => hit.recipe),
      })

      if (!printFood.length) {
        document.querySelector(".form").classList.remove("search-form")
        document
          .querySelector(".empty-input")
          .classList.remove("not-empty-input")
      }
    }

    fetchRecipes()
  }, [printFood])

  const printFoodOnPg = async (e) => {
    e.preventDefault()

    if (searchingForFood) {
      dispatch({
        type: "setPrintFood",
        payload: [...printFood, searchingForFood],
      })
      dispatch({ type: "setSearchingForFood", payload: "" })

      document.querySelector(".form").classList.add("search-form")
      document.querySelector(".empty-input").classList.remove("not-empty-input")
    } else {
      document.querySelector(".empty-input").classList.add("not-empty-input")
    }
  }

  return (
    <RecipeContext.Provider
      value={{
        searchingForFood,
        printFood,
        printRecipes,
        printFoodOnPg,
        dispatch,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

function useRecipe() {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error("useRecipe must be used within a RecipeProvider")
  }
  return context
}

export { RecipeProvider, useRecipe }
