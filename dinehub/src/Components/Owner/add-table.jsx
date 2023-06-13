import React from "react";
import { useFormik } from "formik";
import { AddtableValidation } from "../../YupSchema/TableValidation";
import { tableForm } from "../../helpers/ownerHelpers";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
function AddTableForm() {
  const navigate = useNavigate();


  const data = useSelector((state) => state.owner.owner);
  const { owner } = data;


  const formik = useFormik({
    initialValues: {
      tableNumber: "",
      // capacity: "",
      isAvailable: true,
    },
    validationSchema: AddtableValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
        const id = { owner: owner };
        const allDetails=Object.assign({},values,id)
      const details = tableForm(allDetails);
     
      details
        .then((response) => {
          console.log(response,"ress");
          if (response.status) navigate("/owner/tables");
          else {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    },
  });

  return (
    <div className="p-4 bg-white w-full md:w-3/5 mx-auto md:ml-60 mt-10 rounded-lg shadow-md">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <h2 className="text-xl font-medium mb-4">Add Table</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4 mr-8">
          <label htmlFor="tableNumber" className="text-sm pr-4 font-medium">
            Table Number:
          </label>
          <input
            type="number"
            id="tableNumber"
            min="1"
            onChange={formik.handleChange}
            value={formik.values.tableNumber}
            name="tableNumber"
            className="w-full md:w-64  bg-slate-200 border-gray-300 rounded-md p-2"
          />
          <p className="text-red-600 mt-1 md:ml-20">
            {formik.errors.tableNumber}
          </p>
        </div>
        {/* <div className="mb-4">
          <label htmlFor="capacity" className="text-sm pr-4 font-medium">
            Capacity:
          </label>
          <input
            type="number"
            id="capacity"
            min="1"
            onChange={formik.handleChange}
            value={formik.values.capacity}
            name="capacity"
            className="w-full md:w-64 bg-slate-200 border-gray-300 rounded-md p-2"
          />
          <p className="text-red-600 mt-1 md:ml-20">{formik.errors.capacity}</p>
        </div> */}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 mt-4 rounded-md"
        >
          Add Table
        </button>
      </form>
    </div>
  );
}

export default AddTableForm;
