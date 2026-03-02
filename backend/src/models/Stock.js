import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
     isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export const Stock = mongoose.model("Stock", stockSchema);