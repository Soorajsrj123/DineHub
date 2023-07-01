import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { toast ,Toaster} from "react-hot-toast";
import { RestaurantForm } from "../../helpers/ownerHelpers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Sample() {


  const searchInput=useRef(null)
    const [starthour,setStartHour]=useState('09')
    const [startminute,setStartMinute]=useState('00')
    const[startmeridiem,setStartMeridiem]=useState('AM')



    const [endhour,setEndtHour]=useState('06')
    const [endminute,setEndMinute]=useState('00')
    const[endmeridiem,setEndMeridiem]=useState('PM')



    const [startTime, setStartTime] = useState("08:00 AM");
    const [endTime, setEndTime] = useState("06:00 PM");
    const [suggessions,setSuggessions]=useState(false)
    const [place,setPlace]=useState([])
    const [address,setAddress]=useState({})

    const getPlace = async (e) => {
      console.log(searchInput.current.value);
      const places = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchInput.current.value}.json?proximity=ip&access_token=pk.eyJ1Ijoic29vcmFqc3VyZXNoIiwiYSI6ImNsamR0d3BpNDBhcGkzbGt5czVxdTBnNWIifQ.2I9XXAAd5ML7BcBl82ERbQ`)
      console.log(places);
      setPlace(places.data.features)
      setSuggessions(true)
    }
  
  
    const assignValue = (index) => {
      setAddress(place[index])
      searchInput.current.value = place[index].place_name
      setSuggessions(false)
    }
  

    const[image,setImage]=useState('')
    const navigete=useNavigate()

    useEffect(()=>{
        setStartTime(`${starthour}:${startminute}:${startmeridiem}`)
    },[starthour,startminute,startmeridiem])

    useEffect(()=>{
        setEndTime(`${endhour}:${endminute}:${endmeridiem}`)
    },[endhour,endminute,endmeridiem])

    const handleImage = (e) => {
        const file = e.target.files[0];
     
        if (!file) {
          toast.error("please select a image");
        }
        TransformFile(file);
      };
      const TransformFile = (file) => {
        const reader = new FileReader();
        if (file) {
          // the readAsDataURL return a url
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setImage(reader.result);
          };
        } else {
          setImage("");
        }
      };

      const data = useSelector((state) => state.owner);
      const { owner } = data;

    // console.log("here ",starthour,startminute,startmeridiem,startTime);
    // console.log("end ",endhour,endminute,endmeridiem,endTime);

  const formik = useFormik({
    initialValues: {
      restaurantName: "",
      ownerName: "",
      email: "",
      phone: "",
      // address: "",
      tables: "",
      fssc:"",
      wifi: false,
      parking: false,
      aircondition: false,
      description:""

    },
validateOnBlur:false,
validateOnChange:false,
onSubmit:(values)=>{
        const img={image:image,startTime:startTime,endTime:endTime}
        const restaurantAddress={address:address}
        const allData=Object.assign({},img,restaurantAddress,values)
console.log(allData);
        const response= RestaurantForm(allData,owner)

        toast.loading("Creating")
       response.then((data)=>{
     
         if(data.status){
          toast.dismiss()
            navigete("/owner/registration-success")
         }
       }).catch((err)=>{
        toast.dismiss()
 
        toast.error(err.message)
       })
}
  });
  

 

  return (
    <div >
      <main className="py-14  ">
        <div className="max-w-screen-xl mx-auto py-5 text-gray-600 md:px-8 border border-gray-200 shadow-md rounded-lg ">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="max-w-lg mx-auto space-y-3 sm:text-center">
            <h3 className="text-indigo-600 font-semibold">DineHub</h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Registration
            </p>
            <p>We’d love to hear from you! Please fill out the form bellow.</p>
          </div>
          <div className="mt-12 w-2/4 max-w-lg mx-auto  ">
            <form onSubmit={formik.handleSubmit} className="space-y-5 ">
              <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                <div>
                  <label className="font-medium">Restaurant Name</label>
                  <input
                    type="text"
                    name="restaurantName"
                    onChange={formik.handleChange}
                    value={formik.values.restaurantName}
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">Manager Name</label>
                  <input
                    type="text"
                    name="ownerName"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.ownerName}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                    value={formik.values.email}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Phone number</label>
                <div className="relative mt-2">
                  <input
                    type="number"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    required
                    className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>


              <div className='xl:ml-8 xl:mt-8 flex flex-col xl:me-8 rounded-xl xl:flex justify-between items-center'>
            <div>
              <label htmlFor=""> Address</label>
            </div>

            <div className='xl:w-80 w-full bg-white text-black rounded-md border-black'>

              <div className='mt-3 xl:mt-0 w-full xl:w-full h-11 border border-black rounded-lg flex justify-between items-center'>
                <input ref={searchInput} onKeyUp={getPlace} type="text" name='address' className="w-11/12 outline-none h-full  p-2 bg-white text-black text-sm rounded-lg  dark:text-white" placeholder={`Type the address here......  `} required />
                {/* <FontAwesomeIcon icon="location" className='w-4 h-4 me-3' /> */}
              </div>

            </div>
          </div>


          <div className='w-full justify-end flex mt-1'>
            {
              suggessions &&
              <div className='xl:w-80 w-full h-auto bg-white text-black rounded-bl-md rounded-br-md border-2 border-gray-800 z-50  justify-center xl:me-8'>
                <div className='space-y-3 w-auto h-auto m-3'>
                  {
                    place.map((value, index) => (
                      <div key={index} onClick={() => assignValue(index)} className='flex items-center space-x-2 hover:bg-gray-100 cursor-pointer'>
                        {/* <FontAwesomeIcon icon="location" className='w-3 h-3 pl-2' /> */}
                        <p >{value?.place_name}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            }
          </div>









              {/* <div>
                <label className="font-medium">Address</label>
                <input
                  type="text"
                  required
                  name="address"
                  onChange={formik.handleChange}
                    value={formik.values.address}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div> */}
              <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                <div>
                  <label className="font-medium">Tables</label>
                  <input
                    type="number"
                    name="tables"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.tables}
                    
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">FSSC</label>
                  <input
                    type="text"
                    name="fssc"
                    onChange={formik.handleChange}
                    value={formik.values.fssc}
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                facilities
              </h3>
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      name="wifi"
                      id="vue-checkbox-list"
                      onChange={formik.handleChange}
                    value={formik.values.wifi}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="vue-checkbox-list"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Wifi
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      name="parking"
                      id="react-checkbox-list"
                      onChange={formik.handleChange}
                    value={formik.values.parking}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="react-checkbox-list"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Parking
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      name="aircondition"
                      id="angular-checkbox-list"
                      type="checkbox"
                      onChange={formik.handleChange}
                    value={formik.values.aircondition}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="angular-checkbox-list"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Air Conditioner
                    </label>
                  </div>
                </li>
              </ul>
              <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Start Time
                    </label>

                    <div className="container mx-auto">
                      <div className="inline-flex text-lg border rounded-md shadow-lg p-2">
                        <select
                          name=""
                          id=""
                          className="px-2 outline-none appearance-none bg-transparent"
                          value={starthour}
                          onChange={(e) => setStartHour(e.target.value)}
                        >
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                        <span className="px-2 py-2">:</span>
                        <select
                          name=""
                          id=""
                          className="px-2 outline-none appearance-none bg-transparent"
                          value={startminute}
                         onChange={(e) => setStartMinute(e.target.value)}
                        >
                          <option value="00">00</option>
                        </select>
                        <select
                          name=""
                          id=""
                          className="px-2 outline-none appearance-none bg-transparent"
                          value={startmeridiem}
                          onChange={(e) => setStartMeridiem(e.target.value)}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      End Time
                    </label>

                    <div className="container mx-auto">
                      <div className="inline-flex text-lg border rounded-md shadow-lg p-2">
                        <select
                          name=""
                          id=""
                          value={endhour}
                          onChange={(e) => setEndtHour(e.target.value)}
                          className="px-2 outline-none appearance-none bg-transparent"
                        >
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                        <span className="px-2 py-2">:</span>
                        <select
                          name=""
                          id=""
                          value={endminute}
                          onChange={(e) => setEndMinute(e.target.value)}
                          className="px-2 outline-none appearance-none bg-transparent"
                        >
                          <option value="00">00</option>
                        </select>
                        <select
                          name=""
                          id=""
                          value={endmeridiem}
                          onChange={(e) => setEndMeridiem(e.target.value)}
                          className="px-2 outline-none appearance-none bg-transparent"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="font-medium">Description</label>
                <textarea
                type="text"
                 name="description"
                 value={formik.values.description}
                 onChange={formik.handleChange}
                 
                  className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                ></textarea>
              </div>

              <div className="py-5">
                <input
                  id="file"
                  name="image"
                  onChange={handleImage}
                  type="file"
                  className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                />
              { image&& <img src={image} alt="Preview" className="w-48" />}
              </div>
              <button type="submit" className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Sample;
