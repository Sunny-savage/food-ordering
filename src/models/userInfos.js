import { Schema, models, model } from "mongoose";

const userInfosSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },

    country: {
      type: String,
    },
    phone: {
      type: String,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserInfo = models.UserInfo || model("UserInfo", userInfosSchema);
