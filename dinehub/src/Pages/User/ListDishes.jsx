import React from "react";
import NavBar from "../../Components/User/Navbar";
import DishListsComponent from "../../Components/User/DishLists";
import Footer from "../../Components/User/Footer/Footer";
function ListDishes() {
  return (
    <>
      <NavBar />
      <DishListsComponent />
      {/* <Footer/> */}
    </>
  );
}

export default ListDishes;
