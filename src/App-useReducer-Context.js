import SearchForm from "./components/SearchForm"
import FoodList from "./components/FoodList"
import RecipeList from "./components/RecipeList"
import { RecipeProvider } from "./contexts/RecipeContext"

// hlavný komponent
const App = () => {
  return (
    <section className="section">
      <RecipeProvider>
        <SearchForm />
        <FoodList />
        <RecipeList />
      </RecipeProvider>
    </section>
  )
}

export default App
