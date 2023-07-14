import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllTables } from "../../helpers/ownerHelpers";
import Swal from "sweetalert2";
import { deleteTable } from "../../helpers/ownerHelpers";
const DiningTable = () => {
  const [allTables, setTables] = useState([]);
  const navigate = useNavigate();
  const data = useSelector((state) => state?.owner?.owner);
  const { owner } = data;

  useEffect(() => {
    const fetchTables = async () => {
      const allData = await getAllTables(owner);
      console.log(allData, "data in tables");
      if (allData?.response?.status === 401) {
        navigate("/owner/login");
      }
      setTables(allData?.data?.allDatas);
    };
    fetchTables();
  }, [owner, navigate]);

  const handleDelete = (tableId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result?.isConfirmed) {
        const response = await deleteTable(tableId, owner);

        setTables(response?.allTables);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <div className="flex justify-start">
        <Link to="/owner/add-table">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ml-8 py-4 px-16 border border-blue-500 hover:border-transparent rounded">
            ADD TABLE
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap justify-center mt-4 md:mt-10 lg:mt-16 xl:mt-20">
        {allTables?.map((table, index) => (
          <div
            key={index}
            className="bg-gray-200 p-4 w-11/12 sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12 m-2 rounded-md shadow-md"
          >
            <h3 className="text-lg font-medium mb-2">
              Table {table?.tableNumber}
            </h3>
            {/* <p className="mb-1">Capacity: {table.capacity}</p> */}
            {/* <p
              className={
                table?.isAvailable
                  ? "text-sm text-green-600"
                  : "text-sm text-red-600"
              }
            >
              {table?.isAvailable ? "Available" : "Reserved"}
            </p> */}
            <div className="flex justify-evenly mt-8">
              <Link to={`/owner/edit-table/${table?._id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                  Edit
                </button>
              </Link>

              <button
                onClick={() => handleDelete(table?._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiningTable;
