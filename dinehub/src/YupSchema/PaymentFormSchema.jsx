import * as Yup from 'yup'

export const PaymentFormValidation =Yup.object().shape({
    name:Yup.string().required(" Required"),
    email:Yup.string().email('Invalid email address format').required("Email is required"),
    mobile:Yup.number().min(10,"enter a valid number").required("Mobile Number Required"),
  
})