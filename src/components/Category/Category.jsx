import { RecipeData } from "../../context/RecipeContext";
import "./Category.css";

const Category = () => {
  const { category, categories, handleCategoryClick } = RecipeData();
  let activeCategory = category;

  return (
    <div className="category-main">
      <div className="explore-menu-list">
        {categories?.slice(0, 7).map((category) => (
          <div
            key={category.idCategory}
            className={`explore-menu-list-item ${
              activeCategory === category.strCategory ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category.strCategory)}
          >
            <p>{category.strCategory.slice(0, 8)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
