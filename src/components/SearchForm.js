// komponent pre formulár
import { memo } from "react"
import { useRecipe } from "../contexts/RecipeContext"
import "./SearchForm.css"

function handleClick() {
  document.querySelector(".empty-input").classList.remove("not-empty-input")
}

const SearchForm = () => {
  const { searchingForFood, printFoodOnPg, dispatch } = useRecipe()

  return (
    <form className="form" onSubmit={printFoodOnPg} onClick={handleClick}>
      <input
        className="form-input"
        type="text"
        placeholder="Type ingredient (s)"
        value={searchingForFood}
        onChange={(e) =>
          dispatch({ type: "setSearchingForFood", payload: e.target.value })
        }
      />
      <button className="search-btn">Search</button>
      <p className="empty-input">You didn't type any ingredient!</p>
    </form>
  )
}

export default memo(SearchForm)
