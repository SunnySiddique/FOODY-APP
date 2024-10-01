import Category from "./Category/Category";
import FoodItem from "./FoodItem/FoodItem";
import HeroImage from "./HeroSection/HeroImage";
import Navbar from "./Navbar/Navbar";
import SearchBar from "./SearchBar/SearchBar";

const MainPage = () => {
  return (
    <div className="app">
      <Navbar />
      <section>
        <HeroImage />
      </section>
      <section>
        <SearchBar />
      </section>
      <section>
        <Category />
      </section>
      <hr />
      <section>
        <FoodItem />
      </section>
    </div>
  );
};

export default MainPage;
