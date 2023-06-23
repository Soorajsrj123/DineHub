import Restaurant from "../Models/RestaurantSchema.js";
import RejectedRestaurants from "../Models/RejectedRestaurants.js";
import nodemailer from "nodemailer";

export const selectRequest = async (req, res) => {

  try {
    const AllRestaurants = await Restaurant.find({ status: "pending" });
    if (!AllRestaurants)
      return res.status(404).json({ message: "data not found", status: false });
    return res
      .status(200)
      .json({ message: "success", AllRestaurants, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

export const selectedRestaurantDetails = async (req, res) => {
  try {
    const Id = req.params.id;
    console.log(Id, "here res Id");
    const restaurantData = await Restaurant.findOne({ _id: Id });
    return res.status(200).json({ message: "success", restaurantData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const ApproveRestaurant = async (req, res) => {
  const Id = req.params.id;

  try {
    const updatedData = await Restaurant.findByIdAndUpdate(
      { _id: Id },
      { status: "approved" }
    );
    if (updatedData) {
      // here sending a mail for restaurant owner

      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        service: "gmail",
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      });
      console.log(process.env.PASSWORD, "OO");
      console.log(transporter, "node mailer res");

      const link = `<a href="${process.env.CLIENT_URL}/owner/signup/${Id}">Click here to create account</a>`;
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: updatedData?.email, // list of receivers
        subject:
          "YOUR REQUEST HAS BEEN APROOVED BY ADMIN USE THE LINK TO COMPLETE THE PROCESS", // Subject line
        text: "Hello", // plain text body
        html: link, // html body
      });

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      return res
        .status(200)
        .json({ success: "restaurant application approved successfully" });
    }
  } catch (error) {
    console.log(error, "errrrr>>>>>>>>>>>>>");
    return res.status(500).json({ message: "somethig went wrong" });
  }
};

export const RejectRestaurant = async (req, res) => {
  try {
    const Id = req.params.id;

    const { rejectionReason } = req.body;
    const updatedData = await Restaurant.findByIdAndUpdate(
      { _id: Id },
      { status: "rejected" }
    );
    if (updatedData) {
      // here sending a mail for restaurant owner

      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        service: "gmail",
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      });
      console.log(transporter, "node mailer res");

      const link = `${process.env.CLIENT_URL}/owner/add-restaurant`;
      const reason = `<P >${rejectionReason}</P> <a href=${link} >click here to reapply<a/>`;
      // send mail with defined transport object
      transporter
        .sendMail({
          from: process.env.EMAIL, // sender address
          to: updatedData?.email, // list of receivers
          subject: " YOUR REQUEST HAS BEEN REJECTED BY ADMIN", // Subject line
          text: `Hello,Sorry to say that you your request is rejected due to following reason  REASON:$${rejectionReason}`, // plain text body
          date: new Date("2000-01-01 00:00:00"),
          html: reason, // html body
        })
        .then((info) => {
          console.log("Message sent: %s", info.messageId);

          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
       
          //  here create a new RejectedRestaurant Details And save it in the seperate collections
          const RejectedData = new RejectedRestaurants({
            owner: updatedData.owner,
            ownerName: updatedData.ownerName,
            restaurantName: updatedData.restaurantName,
            email: updatedData.email,
            address: updatedData.address,
            phone: updatedData.phone,
            fssc: updatedData.fssc,
            description: updatedData.description,
            image: updatedData.image,
            startTime: updatedData.startTime,
            endTime: updatedData.endTime,
            rejectedReason: rejectionReason,
          });

          RejectedData.save().then(async () => {
            // Here Deleting The Rejected Restaurant From Restaurants collection
            const dbresponse = await Restaurant.findByIdAndDelete({
              _id: updatedData._id,
            });
            if (dbresponse) {
              // Rejection success
              return res.status(200).json({
                success: "restaurant application Rejected",
                status: true,
              });
            }
          });
        })
    }
  } catch (error) {
    console.log(error, "err");
    return res.status(500).json({ message: "somthing went wrong" });
  }
};

export const getDeclinedRequest = async (req, res) => {
  try {
    const DeclinedRestaurant = await RejectedRestaurants.find({});
    if (!DeclinedRestaurant)
      return res.status(404).json({ message: "Not found", status: false });
    return res
      .status(200)
      .json({ message: "success", DeclinedRestaurant, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

export const getOneRestaurant=async(req,res)=>{
 try {
  const {id}=req.params
  const restaurantData=await Restaurant.findOne({_id:id})
  if(!restaurantData) return res.status(404).json({message:"data not found",status:false})
  else return res.status(200).json({message:"success",status:true,restaurantData})
 } catch (error) {
   return res.status(500).json({message:error,status:false})
 }
}