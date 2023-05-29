import { toast } from "react-hot-toast"
const min_password_length=6
const pattern = /^\d{10}$/

export const signUpValidate=(values)=>{
    let errors={}
    if(!values.password)errors.password=toast.error("Password required")
    else if(values.password.length<min_password_length)errors.password=toast.error(`Password must be ${min_password_length} characters`)
    else if(!values.confirmPassword)errors.confirmPassword=toast.error('Confirm Password Required')
    else if(values.password!==values.confirmPassword)errors.confirmPassword=toast.error('password not match')
    else if(!values.phone)errors.phone=toast.error("phoneNumber Required")
     else if (!values.phone) errors.phone = toast.error("mobile number is required");
     else if (!pattern.test(values.phone)) errors.phone = toast.error("invalid mobile number")
    
    return errors
}

export const LoginValidate=(values)=>{
    let errors={}

    if(!values.email) errors.email=toast.error("email is required")
    else if(!values.password) errors.name=toast.error("password required")
    return errors

}