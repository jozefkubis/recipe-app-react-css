import "./FoodList.css"

const FoodList = ({ printFood, dispatch }) => {
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

export default FoodList
