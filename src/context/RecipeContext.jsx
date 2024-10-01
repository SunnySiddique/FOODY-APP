import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const RecipeContext = createContext();

export const RecipeData = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(res.data.categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchRecipeData = async () => {
    setLoading(true);
    try {
      let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

      if (!search && category) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      }

      const res = await axios.get(url);
      setRecipes(res.data.meals || []);
    } catch (err) {
      setError({ message: "Failed to fetch recipes. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchRecipeData();
  }, []);

  useEffect(() => {
    if (!search) {
      fetchRecipeData();
    }
  }, [category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch("");
    fetchRecipeData();
  };

  const handleCategoryClick = (categoryName) => {
    setCategory(category === categoryName ? "" : categoryName);
    setSearch("");
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        loading,
        error,
        search,
        category,
        categories,
        handleInput,
        fetchRecipeData,
        handleSearchSubmit,
        handleCategoryClick,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext;
