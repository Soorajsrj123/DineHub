import Order from "../Models/Orders.js";
import moment from "moment/moment.js";
import { ObjectId } from "mongodb";
import { isValidObjectId } from "mongoose";
import User from "../Models/UserModel.js";
import { getTotalAmount } from "../helpers/orderHelpers.js";

export const getBookedOrders = async (req, res) => {
  try {
    const { id, date, time } = req.query;


    const formattedDate = moment(date, "M/D/YYYY").format(
      "YYYY-MM-DDTHH:mm:ss.SSSZ"
    );

    // problem here
 

    if (date) {
   
      // NEED TO CHANGE TO FIND WITHOUT ANYTHING
      let orders = await Order.find({ userId: new ObjectId(id) });
      // console.log(orders, "oo");
      if (orders.length != 0) {
   
        let bookedOrders = await Order.find({
          time: time,
          date: formattedDate,
          isBooked: true,
        });
      
        if (bookedOrders.length != 0) {
    
          res.status(200).send({ data: bookedOrders });
        } else {
          res.status(404).send({ msg: "no data" });
        }
      } else {
        res.status(404).send({ msg: "no data" });
      }
    } else {
      return res.status(404).json({ message: "no date" });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const ConfirmPayment = async (req, res) => {
  try {
    const { datas, bookingAddress } = req.body;

    const data = await Order.findByIdAndUpdate(datas.id, {
      $set: {
        isBooked: true,
        ownerId: datas.ownerId,
        isReserved: true,
        bookingAddress,
      },
    });

    if (data) {
      res.status(200).json({ message: "success", data });
    } else {
      return res.status(404).json({ message: "data not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const UserOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const UserOrders = await Order.find({ userId: id }).sort({createdAt:-1})
 
    if (UserOrders.length != 0) {
      return res.status(200).json({ message: "success", UserOrders });
    }
    return res.status(404).json({ message: "Data not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const adminYearlyData = async (req, res) => {
  try {
   
    const result = await Order.aggregate([
      {
        $unwind: "$orderDetails",
      },
      {
        $group: {
          _id: { $year: "$createdAt" },
          totalSales: {
            $sum: { $toDouble: "$orderDetails.total" },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    if (result) {
      // console.log(result);
      const yearlyData = result.map((obj) => obj.totalSales);
      // console.log(yearlyData, "yearly data here");
      return res.status(200).json({ message: "success", data: yearlyData });
    } else {
      return res.status(404).json({ message: "data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const adminDailyData = async (req, res) => {
  const currentMonth = new Date().getMonth();

  // Get the number of days in the current month
  const daysInMonth = new Date(
    new Date().getFullYear(),
    currentMonth + 1,
    0
  ).getDate();
  

  // Generate an array of days for the current month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  try {
    const adminDailyData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), currentMonth, 1),
            $lte: new Date(
              new Date().getFullYear(),
              currentMonth,
              daysInMonth,
              23,
              59,
              59
            ),
          },
        },
      },
      {
        $unwind: "$orderDetails",
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
          },
          totalSales: { $sum: "$orderDetails.total" },
        },
      },
    ]);

    const formattedData = days.map((item, index) => {
      const day = adminDailyData.find((obj) => obj._id.day === item);
      const totalSales = day ? day.totalSales : "";
      return { day: item, totalSales: totalSales };
    });

    // console.log(formattedData, "formatted data");
    return res.status(200).json({ message: "success", data: formattedData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

// ADMIN MONTHLY SALES DATA

export const adminMonthlyData = async (req, res) => {
  try {
    const months = [
      "jan",
      "feb",
      "mar",
      "api",
      "may",
      "jun",
      "july",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];

    const currentYear = new Date().getFullYear();

    const monthlyData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(currentYear, 0, 1), // Start of the year
            $lt: new Date(currentYear + 1, 0, 1), // Start of the next year
          },
        },
      },
      {
        $unwind: "$orderDetails",
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$orderDetails.total" },
        },
      },
    ]);

  

    const formattedData = months.map((item, index) => {
      const month = monthlyData.find((obj) => obj._id === index + 1);
      const totalSales = month ? month.totalSales : "";
      return { month: item, totalSales: totalSales };
    });

    // console.log(formattedData, "formatted data");
    return res.status(200).json({ message: "success", data: formattedData });
  } catch (error) {
    console.log(error, "error in admin monthly data");
    return res.status(500).json({ message: error });
  }
};

export const getRestaurantYearlySales = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurantYearlyData = await Order.aggregate([
      {
        $match: {
          ownerId: new ObjectId(id),
        },
      },
      {
        $unwind: "$orderDetails",
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" }, // Assuming you have a "date" field for sales
          },
          totalSales: { $sum: "$orderDetails.total" }, // Assuming you have an "amount" field for sales
        },
      },
      {
        $sort: {
          "_id.year": 1,
        },
      },
    ]);
    // console.log(restaurantYearlyData, "restauratn yearly Data");
    res.status(200).json({ message: "success", data: restaurantYearlyData });
  } catch (error) {
    console.log("error in restaurantYearly sales Report", error);
    return res.status(500).json({ message: error });
  }
};

export const getRestaurantMonthlySales = async (req, res) => {
  try {
    const { id } = req.params;
    const aggregatedData = await Order.aggregate([
      {
        $match: {
          ownerId: new ObjectId(id),
        },
      },
      {
        $unwind: "$orderDetails",
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$orderDetails.total" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedData = months.map((monthName, index) => {
      const monthData = aggregatedData.find((item) => item._id === index + 1);
      const totalSales = monthData ? monthData.totalSales : "";
      return { month: monthName, totalSales: totalSales };
    });
    // console.log(formattedData, "formatted data");
    return res.status(200).json({ message: "success", data: formattedData });
  } catch (error) {
    console.log("error in restarant Montly data", error);
    res.status(500).json({message:"internal server error"})
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.params;

    const allOrders = await Order.find({ ownerId: id });
    if (!allOrders) return res.status(404).json({ message: "data not found" });
    return res.status(200).json({ message: "success", allOrders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getRestaurantDailySales = async (req, res) => {
  try {
    const { id } = req.params;

    const currentMonth = new Date().getMonth();

    // Get the number of days in the current month
    const daysInMonth = new Date(
      new Date().getFullYear(),
      currentMonth + 1,
      0
    ).getDate();

    

    // Generate an array of days for the current month
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const restaurantDailyData = await Order.aggregate([
      {
        $match: {
          ownerId: new ObjectId(id),
          createdAt: {
            $gte: new Date(new Date().getFullYear(), currentMonth, 1),
            $lte: new Date(
              new Date().getFullYear(),
              currentMonth,
              daysInMonth,
              23,
              59,
              59
            ),
          },
        },
      },
      {
        $unwind: "$orderDetails",
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
          },
          totalSales: { $sum: "$orderDetails.total" },
        },
      },
    ]);

    const formattedData = days.map((item, index) => {
      const day = restaurantDailyData.find((obj) => obj._id.day === item);
      const totalSales = day ? day.totalSales : "";
      return { day: item, totalSales: totalSales };
    });

   
    if (formattedData)
      return res.status(200).json({ message: "success", formattedData });
    return res.status(404).json({ message: "data not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id, userId } = req.params;
    if (isValidObjectId(id) && isValidObjectId(userId)) {
    
      const data = await Order.findByIdAndUpdate(
        { _id: id, userId },
        {
          $set: {
            isCancelled: true,
          },
        }
      );

      if (data) {
        const details = await getTotalAmount(id, userId);
        const totalAmout = details[0].totalSales;
        const walletUpdate = await User.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              wallet: totalAmout,
            },
          }
        );
       
        if (walletUpdate) {
          const newOrderDetails = await Order.find({}).sort({createdAt:-1})
         
          return res.status(201).json({ message: "success", newOrderDetails });
        }
        return res.status(404).json({ message: "data not found" });
      }
    } else {
      return res.status(400).json({ message: "Bad request" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
