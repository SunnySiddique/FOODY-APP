import { Link } from "react-router-dom";

const Item = ({ idMeal, strMealThumb, strMeal, getRandomPrice }) => {
  return (
    <>
      <Link to={`/recipe/${idMeal}`}>
        <div className="food-item">
          <div className="food-item-img-container">
            <img src={strMealThumb} alt={strMeal} className="food-item-image" />
            <div className="overlay">
              <span>View Full Details</span>
            </div>
          </div>
          <div className="food-item-info">
            <div className="food-item-name-rating">
              <p>{strMeal}</p>
            </div>
            <div className="food-item-price">${getRandomPrice(10, 50)}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Item;
