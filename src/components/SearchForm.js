// komponent pre formulár
import "./SearchForm.css";

const SearchForm = ({
  searchingForFood,
  setSearchingForFood,
  printFoodOnPg,
}) => {
  return (
    <form
      className="form"
      onSubmit={printFoodOnPg}
      onClick={() => {
        const emptyInput = document.querySelector(".empty-input");
        emptyInput.classList.remove("not-empty-input");
      }}
    >
      <input
        className="form-input"
        type="text"
        placeholder="Type ingredient (s)"
        value={searchingForFood}
        onChange={(e) => setSearchingForFood(e.target.value)}
      />
      <button className="search-btn">Search</button>
      <p className="empty-input">You didn't type any ingredient!</p>
    </form>
  );
};

export default SearchForm;
