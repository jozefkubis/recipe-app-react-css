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

  // efekt na získanie receptov podľa poľa printFood
  useEffect(() => {
    const printFoodJoin = printFood.join(",")

    // asynchrónna funkcia na volanie getRecipes
    const fetchRecipes = async () => {
      // čakáme na výsledok sľubu
      const recipes = await getRecipes(printFoodJoin)
      // nastavujeme stav printRecipes na pole receptov
      dispatch({
        type: "setPrintRecipes",
        payload: recipes.hits.map((hit) => hit.recipe),
      })

      const form = document.querySelector(".form")
      const emptyInput = document.querySelector(".empty-input")
      if (!printFood.length) {
        // odstránime "search-form" z className formulára
        form.classList.remove("search-form")
        emptyInput.classList.remove("not-empty-input")
      }
    }

    // zavoláme funkciu fetchRecipes
    fetchRecipes()
  }, [printFood])

  // funkcia na pridanie novej potraviny do poľa printFood

  const printFoodOnPg = async (e) => {
    e.preventDefault()

    if (searchingForFood) {
      dispatch({
        type: "setPrintFood",
        payload: [...printFood, searchingForFood],
      })

      dispatch({ type: "setSearchingForFood", payload: "" })

      // získame referenciu na formulár pomocou querySelector
      const form = document.querySelector(".form")

      // pridáme "search-form" do className formulára
      form.classList.add("search-form")

      const emptyInput = document.querySelector(".empty-input")
      emptyInput.classList.remove("not-empty-input")
    } else {
      const notEmptyInput = document.querySelector(".empty-input")
      notEmptyInput.classList.add("not-empty-input")
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
