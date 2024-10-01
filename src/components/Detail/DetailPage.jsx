import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import "./DetailPage.css";

const DetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setRecipe(res.data.meals[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (loading)
    return (
      <div className="loader">
        <HashLoader color="#0de092" />
      </div>
    );
  if (error) return <div className="error">Error loading recipe details</div>;
  if (!recipe) return <div className="no-recipe">No recipe found</div>;

  return (
    <div className="recipe-main">
      <div className="recipe-details">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-image"
        />
      </div>
      <div className="recipe-detail-content">
        <h1 className="recipe-title">{recipe.strMeal}</h1>
        <p className="recipe-instructions">{recipe.strInstructions}</p>

        {/* Display ingredients directly */}
        <div className="recipe-ingredients">
          <h2>Ingredients</h2>
          <ul>
            <li>
              {recipe.strIngredient1} - {recipe.strMeasure1}
            </li>
            <li>
              {recipe.strIngredient2} - {recipe.strMeasure2}
            </li>
            <li>
              {recipe.strIngredient3} - {recipe.strMeasure3}
            </li>
            <li>
              {recipe.strIngredient4} - {recipe.strMeasure4}
            </li>
            <li>
              {recipe.strIngredient5} - {recipe.strMeasure5}
            </li>
            <li>
              {recipe.strIngredient6} - {recipe.strMeasure6}
            </li>
            <li>
              {recipe.strIngredient7} - {recipe.strMeasure7}
            </li>
            <li>
              {recipe.strIngredient8} - {recipe.strMeasure8}
            </li>
            {/* Add more ingredients as needed */}
          </ul>
        </div>

        {recipe.strYoutube && (
          <div className="recipe-video">
            <iframe
              src={`https://www.youtube.com/embed/${
                recipe.strYoutube.split("=")[1]
              }`}
              title={recipe.strMeal}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <Link to="/" className="back-link">
          Back
        </Link>
      </div>
    </div>
  );
};

export default DetailPage;
