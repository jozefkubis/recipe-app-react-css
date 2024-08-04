import { memo } from "react"
import { useRecipe } from "../contexts/RecipeContext"
import "./FoodList.css"

const FoodList = () => {
  const { printFood, dispatch } = useRecipe()

  function handleClick() {
    dispatch({ type: "setPrintFood", payload: [] })
  }

  return (
    <div className="food-list">
      {printFood.map((oneFood, index) => (
        <div className="printed-food" key={index}>
          <p>{oneFood}</p>
          <button
            className="foodList-btn"
            onClick={() => {
              dispatch({
                type: "setPrintFood",
                payload: printFood.filter((item) => item !== oneFood),
              })
            }}
          >
            ✖
          </button>
        </div>
      ))}

      <div
        className="delete-all"
        style={{ display: printFood.length < 1 && "none" }}
      >
        <p>Delete All</p>
        <button className="delete-all-btn" onClick={handleClick}>
          ❌
        </button>
      </div>
    </div>
  )
}

export default memo(FoodList)
