import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { singleTableDetails } from "../../helpers/ownerHelpers";
import { useFormik } from "formik";
import { editTable } from "../../helpers/ownerHelpers";

function EditTable() {
  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isAvailable, setIsActive] = useState("");

  const navigate = useNavigate();

  const tableId = useParams();
  const { id } = tableId;
  useEffect(() => {
    const data = singleTableDetails(id);
    data.then((response) => {
      setTableNumber(response?.tableNumber);
      setCapacity(response?.capacity);
      setIsActive(response?.isAvailable);
    });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      tableNumber: "",
      capacity: "",
      isAvailable: isAvailable,
    },
    onSubmit: () => {
      const datas = { tableNumber, capacity, isAvailable };

      const details = editTable(datas, id);
      details
        .then((response) => {
          if (response?.status) {
            navigate("/owner/tables");
          } else {
            toast.error(response.message);
          }
        })
        .catch((err) => {
          console.log(err, "err in edit table");
          toast.error(err);
        });
    },
  });

  return (
    <div>
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
              name="tableNumber"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full md:w-64  bg-slate-200 border-gray-300 rounded-md p-2"
            />
            <p className="text-red-600 mt-1 md:ml-20"></p>
          </div>
          <div className="mb-4">
            <label htmlFor="capacity" className="text-sm pr-4 font-medium">
              Capacity:
            </label>
            <input
              type="number"
              onChange={(e) => setCapacity(e.target.value)}
              id="capacity"
              min="1"
              value={capacity}
              name="capacity"
              className="w-full md:w-64 bg-slate-200 border-gray-300 rounded-md p-2"
            />
            <p className="text-red-600 mt-1 md:ml-20"></p>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 mt-4 rounded-md"
          >
            Add Table
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTable;
