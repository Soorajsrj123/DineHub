import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/User/Home';
import AdminLogin from './Components/Admin/adminLogin';
import SignUp from './Pages/User/Signuppage';
import OwnerDashboard from './Pages/Owner/dashBoard'
import Login from './Pages/User/Loginpage';
import Dashboad from './Pages/Admin/Dashboard.js';
import OwnerSignUp from './Pages/Owner/signupPage'
import OwnerLogin from './Pages/Owner/LoginPage'
import OwnerRestaurents from'./Pages/Owner/RestaurentPage'
import AdminDashboard from './Pages/Admin/Dashboard'
import AdminRestaurants from './Pages/Admin/Restaurants'
import AdminOwners from './Pages/Admin/OwnerPage'
import AdminAddRestaurant from './Pages/Owner/add-restaurantPage'
import HotelTimeInput from './Components/Owner/editRestaurant'
import ViewDishes from './Pages/Owner/View-Dishes';
import AddDish from './Pages/Owner/add-dish';
import EditDish from './Pages/Owner/edit-dish';
import OwnerTables from './Pages/Owner/view-tables'
import AddTable from './Pages/Owner/add-table';
import EditTablePage from './Pages/Owner/edit-Table';
import OtpPage from './Components/OtpLogin/new'
import UsersListPage from './Pages/Admin/Users-List'
import AccessControlPage from './Pages/Admin/Restaurant/Permision-controlPage'
import ViewRequestPage from './Pages/Admin/Restaurant/view-reqPage'
import RegistrationSuccessComponent from './Components/Owner/Registration-Succes'
import OwnerOtpComponent from'./Components/OtpLogin/Owner-Otp'
import UserOtpPage  from './Components/OtpLogin/UserOtp/OTPInput'
import NewPasswordPage from './Pages/User/NewPassword'
import DeclinedRequestList from './Pages/Admin/Restaurant/Declined-Requests'
import ViewRestaurantPage from './Pages/Admin/Restaurant/ViewRestaurantPage';
function App() {
 
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>

        {/* USER */}
       <Route  path="/home" element={<Home/>}  />  
       <Route path="/login" element={<Login/>}  />
       <Route path="/signup" element={<SignUp/>}  />
       <Route path='/otp/forgot-password' element={<UserOtpPage/>}  />
       <Route path='/forgot-password/:id' element={<NewPasswordPage />} />
       <Route path='/otp' element={<OtpPage/>}/>


{/* ADMIN */}
       <Route path='/admin'  element={<Dashboad/>}/>
       <Route path='/admin/login' element={<AdminLogin/>} />
       <Route exact path='/admin/dashboard' element={<AdminDashboard/>}/>
       <Route exact path='/admin/owners' element={<AdminOwners/>}/>
       <Route exact path='/admin/restaurants' element={<AdminRestaurants/>}/>
        <Route path='/admin/restaurant/declined-list' element={<DeclinedRequestList/>} />
       <Route  path='/admin/users' element={< UsersListPage/>} />
       <Route path='/admin/access-control' element={<AccessControlPage/>}   />
       <Route  path='/admin/view-request/:id' element={<ViewRequestPage/>} />
         <Route path='/admin/restaurant/view-restaurant/:id'  element={<ViewRestaurantPage/>} />

        {/* OWNER */}

       <Route path='/owner/signup/:id' element={<OwnerSignUp/>} />
       <Route path='/owner/dashboard' element={<OwnerDashboard/>} />
       <Route path='/owner/login' element={<OwnerLogin/>}/>
      <Route path='/owner/restaurants' element={<OwnerRestaurents/>}/>
       <Route exact path='/owner/add-restaurant' element={<AdminAddRestaurant/>}/>
       <Route exact path='/owner/edit-restaurant/:id' element={<HotelTimeInput/>}/>
       <Route path='/owner/dishes' element={<ViewDishes/>}/>
       <Route path='/owner/add-dish' element={<AddDish/>} />
       <Route path='/owner/edit-dish/:id'  element={<EditDish/>} />
       <Route path='/owner/tables' element={<OwnerTables/>}/>
       <Route path='/owner/add-table' element={<AddTable/>}/>
       <Route path='/owner/edit-table/:id'  element= {<EditTablePage/>} />
       <Route path='/owner/registration-success' element={<RegistrationSuccessComponent/>}/>
       <Route  path='/owner/signup-otp' element={<OwnerOtpComponent/>}  />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
