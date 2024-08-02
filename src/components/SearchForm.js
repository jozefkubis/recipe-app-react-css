// komponent pre formulár
import "./SearchForm.css"

const SearchForm = ({ searchingForFood, printFoodOnPg, dispatch }) => {
  return (
    <form
      className="form"
      onSubmit={printFoodOnPg}
      onClick={() => {
        const emptyInput = document.querySelector(".empty-input")
        emptyInput.classList.remove("not-empty-input")
      }}
    >
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

export default SearchForm
