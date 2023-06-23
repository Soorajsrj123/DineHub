import Order from "../Models/Orders.js";
import moment from "moment/moment.js";
import { ObjectId } from "mongodb";

export const getBookedOrders = async (req, res) => {
  console.log(req.query, ">>>>><<<<<<<>>>>>>>><<<<<<<");
  try {
    const { id, date, time } = req.query;

    console.log(date, "date");

    const formattedDate = moment(date, "M/D/YYYY").format(
      "YYYY-MM-DDTHH:mm:ss.SSSZ"
    );

    // problem here
    console.log(formattedDate, "converted data");

    if (date) {
      console.log("<<<<INSIDE>>>>");
      // NEED TO CHANGE TO FIND WITHOUT ANYTHING
      let orders = await Order.find({ userId: new ObjectId(id) });
      console.log(orders, "oo");
      if (orders.length != 0) {
        console.log("order");
        let bookedOrders = await Order.find({
          time: time,
          date: formattedDate,
          isBooked: true,
        });
        console.log(bookedOrders, "oooo");
        if (bookedOrders.length != 0) {
          console.log("booked");
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
    console.log(req.body, "confirm payment body");
    const { datas, bookingAddress } = req.body;
    console.log(datas.id);
    const data = await Order.findByIdAndUpdate(datas.id, {
      $set: {
        isBooked: true,
        ownerId: datas.ownerId,
        isReserved: true,
        bookingAddress,
      },
    });

    console.log(data, "from confirm payment");
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
    console.log(id, "id");
    const UserOrders = await Order.find({});
    console.log(UserOrders, "userorder");
    if (UserOrders.length != 0)
      return res.status(200).json({ message: "success", UserOrders });
    return res.status(404).json({ message: "Data not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const adminYearlyData = async (req, res) => {
  try {
    console.log("api called");
    const result = await Order.aggregate([
      {
        $unwind: "$orderDetails",
      },
      {
        $group: {
          _id: { $year: "$createdAt" },
          totalSales: {
            $sum:{$toDouble: "$orderDetails.total"},
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    if(result){
      console.log(result);
      const yearlyData= result.map(obj=>obj.totalSales)
      console.log(yearlyData, "yearly data here");
         return res.status(200).json({message:"success",data:yearlyData})
    }else{

      return res.status(404).json({message:"data not found"})
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:error})
  }
};

export const adminDailyData=async(req,res)=>{
  console.log("here calllled hhhh");
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log(today);
    const result=await Order.aggregate([
      {
        $match:{
          date:{$gte:today}
      }
      },
      {
        $unwind:"$orderDetails"
      },
      {
        $group:{
          _id:null,
          totalSales:{$push:"$orderDetails.total"}
        }
      }
    ])
    // console.log(result,"daily restult");
    const dailySales=result.length>0?result[0].totalSales:0
    console.log(dailySales,"sended reponse");
    res.status(200).json({dailySales})
  } catch (error) {
    console.log(error);
  }
}