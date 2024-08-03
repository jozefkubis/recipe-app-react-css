import { memo } from "react"
import { useRecipe } from "../contexts/RecipeContext"
import "./FoodList.css"

const FoodList = () => {
  const { printFood, dispatch } = useRecipe()

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
            x
          </button>
        </div>
      ))}
    </div>
  )
}

export default memo(FoodList)
