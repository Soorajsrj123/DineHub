import mongoose from "mongoose";

const TableSchema = mongoose.Schema({
  restaurantId: {
    type: Object,
  },
  tableNumber: {
    type: Number,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Table", TableSchema);
