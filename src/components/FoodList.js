// komponent pre zoznam potravín
import "./FoodList.css";

const FoodList = ({ printFood, setPrintFood }) => {
  return (
    <div className="food-list">
      {printFood.map((oneFood, index) => {
        return (
          <div className="printed-food" key={index}>
            <p>{oneFood}</p>
            <button
              className="foodList-btn"
              onClick={() => {
                setPrintFood(printFood.filter((item) => item !== oneFood));
              }}
            >
              x
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FoodList;
