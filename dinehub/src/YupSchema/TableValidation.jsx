
import * as Yup from 'yup'

export const AddtableValidation =Yup.object().shape({
    tableNumber:Yup.number().required("Table number is required"),
    capacity:Yup.number().required("Enter the maximum capacity")
})