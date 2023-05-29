import React from 'react'
import Carousel from '../../Components/User/Carousal' 
import NavBar from '../../Components/User/Navbar'
import ListRestaurants from '../../Components/User/List-restaurants'
function HomePage() {
  return (
<div>
  <NavBar/>
   <Carousel/>
<ListRestaurants/>
</div>
  )
}

export default HomePage