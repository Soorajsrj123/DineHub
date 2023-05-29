import * as Yup from 'yup'


export const RestaurantFormSchema=Yup.object().shape({
    restaurantName:Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Restaurant Name Required'),
    address:Yup.string().required("Address is Required"),
    tables:Yup.number().required("Table is Required"),
    time:Yup.string().required("Time is Required"),
    phone:Yup.number().required("PhoneNumber is Required"),
    file:Yup.array().min(1,"Select at least 1 file")
    

})