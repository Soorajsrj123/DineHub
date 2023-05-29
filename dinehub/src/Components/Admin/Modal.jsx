import React, { useEffect, useState } from "react";
import { RejectRestaurant } from "../../helpers/adminHelpers";

import "./Modal.css";

import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const MyModal = ({ CloseModal, restaurantId }) => {
  const [id, setRestaurantId] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      rejectionReason: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const reject = RejectRestaurant(values, id);

      toast.promise(reject, {
        loading: "Loading ",
        success: <b>Registration Rejected successfully</b>,
        error: <b>Error: Unable Reject the Form</b>,
      });
      reject.then((data) => {
        if (data.status) {
          // toast.success("rejected successfully")
          setTimeout(() => {
            navigate("/admin/access-control");
          }, 1000);
        }
      });
    },
  });

  useEffect(() => {
    setRestaurantId(restaurantId);
  }, [restaurantId]);

  return (
    <>
      <div className="modal-wrapper " onClick={CloseModal}></div>
      <div className="modal-container flex ">
        <form onSubmit={formik.handleSubmit}>
          <div className="">
            <h2 className="font-serif mb-10 font-bold ">Reson for Rejection</h2>

            <textarea
              type="text"
              name="rejectionReason"
              value={formik.values.rejectionReason}
              onChange={formik.handleChange}
              className="modal-input mb-8"
            />

            <button type="submit" className="modal-btn bg-green-600 mr-3 ">
              Submit
            </button>
            <button
              className="modal-btn bg-red-500  ml-3 "
              onClick={CloseModal}
            >
              close
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MyModal;
