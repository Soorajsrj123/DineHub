import mongoose from "mongoose";

const TableSchema = mongoose.Schema({
  owner: {
    type: Object,
  },
  tableNumber: {
    type: Number,
  },
  capacity: {
    type: Number,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Table", TableSchema);
