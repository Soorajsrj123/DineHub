import React from "react";
import Chart from "../../../Components/Owner/DashBoard/Charts";
import { NavbarOne } from "../../../Components/Owner/Navbar";
import PichartComponent from "../../../Components/Owner/DashBoard/Pichart";
function dashBoard() {
  return (
    <div>
      <NavbarOne />
      <PichartComponent />
      <Chart />
    </div>
  );
}

export default dashBoard;
