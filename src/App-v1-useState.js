import { useState, useEffect } from "react"
import getRecipes from "./hooks/getRecipes"
import SearchForm from "./components/SearchForm"
import FoodList from "./components/FoodList"
import RecipeList from "./components/RecipeList"

// const initialState = {
//   searchingForFood: "",
//   printFood: [],
//   printRecipes: [],
// }

// function reducer(state, action) {
//   switch (action.type) {
//     case "setSearchingForFood":
//       return { ...state, searchingForFood: action.payload }
//     case "setPrintFood":
//       return { ...state, printFood: action.payload }
//     case "setPrintRecipes":
//       return { ...state, printRecipes: action.payload }
//     default:
//       throw new Error("Invalid action type")
//   }
// }

// hlavný komponent
const App = () => {
  const [searchingForFood, setSearchingForFood] = useState("")
  const [printFood, setPrintFood] = useState([])
  const [printRecipes, setPrintRecipes] = useState([])

  // const [{searchingForFood, printFood, printRecipes}, dispatch] = useReducer(reducer, initialState)

  // efekt na získanie receptov podľa poľa printFood
  useEffect(() => {
    const printFoodJoin = printFood.join(",")

    // asynchrónna funkcia na volanie getRecipes
    const fetchRecipes = async () => {
      // čakáme na výsledok sľubu
      const recipes = await getRecipes(printFoodJoin)
      // nastavujeme stav printRecipes na pole receptov
      setPrintRecipes(recipes.hits.map((hit) => hit.recipe))

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
      setPrintFood((prevPrintFood) => {
        return [...prevPrintFood, searchingForFood]
      })

      setSearchingForFood("")

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

  // vraciame JSX s menšími komponentmi
  return (
    <section className="section">
      <SearchForm
        searchingForFood={searchingForFood}
        setSearchingForFood={setSearchingForFood}
        printFoodOnPg={printFoodOnPg}
      />
      <FoodList printFood={printFood} setPrintFood={setPrintFood} />
      <RecipeList
        printRecipes={printRecipes}
        setPrintRecipes={setPrintRecipes}
        searchingForFood={searchingForFood}
      />
    </section>
  )
}

export default App
