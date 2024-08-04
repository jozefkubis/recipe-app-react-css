import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react"
import getRecipes from "../hooks/getRecipes"
// import Error from "../components/Error"

const RecipeContext = createContext()

const initialState = {
  searchingForFood: "",
  printFood: [],
  printRecipes: [],
  error: null, // pridajte stav pre chyby
}

function reducer(state, action) {
  switch (action.type) {
    case "setSearchingForFood":
      return { ...state, searchingForFood: action.payload }
    case "setPrintFood":
      return { ...state, printFood: action.payload }
    case "setPrintRecipes":
      return { ...state, printRecipes: action.payload }
    case "setError":
      return { ...state, error: "Something went wrong with fetching data!" }
    case "clear":
      return initialState
    default:
      throw new Error("Invalid action type")
  }
}

function RecipeProvider({ children }) {
  const [{ searchingForFood, printFood, printRecipes, error }, dispatch] =
    useReducer(reducer, initialState)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const printFoodJoin = printFood.join(",")

    const fetchRecipes = async () => {
      setLoading(true)
      try {
        const recipes = await getRecipes(printFoodJoin)
        setLoading(false)

        if (recipes) {
          dispatch({
            type: "setPrintRecipes",
            payload: recipes.hits.map((hit) => hit.recipe),
          })
        }

        if (!printFood.length) {
          document.querySelector(".form").classList.remove("search-form")
          document
            .querySelector(".empty-input")
            .classList.remove("not-empty-input")
        }
      } catch (error) {
        setLoading(false)
        dispatch({ type: "setError" })
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
        loading,
        error,
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
