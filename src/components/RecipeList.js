// komponent pre zoznam receptov
import { useRecipe } from "../contexts/RecipeContext"
import "./RecipeList.css"
import Loader from "./Loader"
import Error from "./Error"

const RecipeList = () => {
  const { printRecipes, dispatch, loading, error } = useRecipe()

  const handleRemove = (recipe) => {
    dispatch({
      type: "setPrintRecipes",
      payload: printRecipes.filter((item) => item !== recipe),
    })
  }

  return (
    <ol className="recipe-list">
      {printRecipes.map((recipe, index) => {
        const { label, image, ingredientLines, calories, url, totalNutrients } =
          recipe

        return (
          <li className="recipe-item" key={index}>
            <h3 className="recipe-title">
              {label}{" "}
              <button
                // className="recipe-btn"
                style={{ cursor: "pointer" }}
                onClick={() => handleRemove(recipe)}
              >
                ✖
              </button>
            </h3>
            <div className="div-flex1">
              <img className="recipe-image" src={image} alt={label} />
              <div className="div-flex2">
                <p className="recipe-ingredients">
                  Ingredients: {ingredientLines.join(", ")}
                </p>
                <p>
                  {totalNutrients["PROCNT"].label}:{" "}
                  {totalNutrients["PROCNT"].quantity.toFixed(2)}{" "}
                  {totalNutrients["PROCNT"].unit}
                </p>
                <p>
                  {totalNutrients["CHOCDF"].label}:{" "}
                  {totalNutrients["CHOCDF"].quantity.toFixed(2)}{" "}
                  {totalNutrients["CHOCDF"].unit}
                </p>
                <p>
                  {totalNutrients["SUGAR"].label}:{" "}
                  {totalNutrients["SUGAR"].quantity.toFixed(2)}{" "}
                  {totalNutrients["SUGAR"].unit}
                </p>
                <p>
                  {totalNutrients["FIBTG"].label}:{" "}
                  {totalNutrients["FIBTG"].quantity.toFixed(2)}{" "}
                  {totalNutrients["FIBTG"].unit}
                </p>
                <p className="recipe-calories">
                  Calories: {Math.round(calories)}
                </p>
                <div>
                  <a href={url} target="_blank" rel="noreferrer">
                    Click here for instructions...
                  </a>
                </div>
              </div>
            </div>
          </li>
        )
      })}
      {loading && <Loader />}
      {error && <Error message={error} />}
    </ol>
  )
}

export default RecipeList
