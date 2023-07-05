import React from "react";
import Carousel from "../../Components/User/Carousal";
import NavBar from "../../Components/User/Navbar";
import ListRestaurants from "../../Components/User/List-restaurants";
import Footer from "../../Components/User/Footer/Footer";
function HomePage() {
  return (
    <div className="bg-gray-300">
      <NavBar />
      <Carousel />
      <ListRestaurants />
      <Footer />
    </div>
  );
}

export default HomePage;
