import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userEmail: String,
    phone: String,
    streetAddress: String,
    postalCode: String,
    city: String,
    country: String,
    cartProducts: Object,
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models?.Order || mongoose.model("Order", orderSchema);
 