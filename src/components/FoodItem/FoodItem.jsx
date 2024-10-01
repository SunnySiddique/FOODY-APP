import { useEffect } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { RecipeData } from "../../context/RecipeContext";
import "./FoodItem.css";
import Item from "./Item";

const FoodItem = () => {
  const { recipes, loading, error } = RecipeData();

  useEffect(() => {
    if (!loading && recipes.length === 0) {
      toast.info("No recipes available at the moment.");
    }
  }, [recipes, loading]);

  const getRandomPrice = (min = 5, max = 50) => {
    return (Math.random() * (max - min) + min).toFixed(0);
  };

  return (
    <>
      {loading ? (
        <div className="loader">
          <HashLoader color="#01c48e" />
        </div>
      ) : (
        <>
          {error ? (
            <h1 className="error-message">
              Error: {error.message || "Data not found"}
            </h1>
          ) : (
            <>
              <h2 className="item-heading">Top dishes near you</h2>
              <div className="food-display-list">
                {recipes.length > 0 &&
                  recipes.map((recipe, i) => {
                    const { idMeal, strMealThumb, strMeal } = recipe;
                    return (
                      <Item
                        idMeal={idMeal}
                        strMealThumb={strMealThumb}
                        strMeal={strMeal}
                        getRandomPrice={getRandomPrice}
                        key={i}
                      />
                    );
                  })}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default FoodItem;
