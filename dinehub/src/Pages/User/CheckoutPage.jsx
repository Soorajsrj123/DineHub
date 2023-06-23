import React from 'react'
import CheckOutComponent from '../../Components/User/Checkout'
import NavBar from '../../Components/User/Navbar'
import RestaurantBanner from '../../Components/User/Banner/RestaurantBanner'
import Footer from '../../Components/User/Footer/Footer'
import Rating from '../../Components/User/Rating/Rating'
function CheckoutPage() {
  return (
    <div>
        <NavBar/>
        <CheckOutComponent/>
        <RestaurantBanner/>
        <Rating/>
        <div className='mt-3' > 
        <Footer />
        </div>
    </div>
  )
}

export default CheckoutPage