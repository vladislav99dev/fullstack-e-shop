const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    validate: [/^[a-z-']+$/i, "First name is not in valid format"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    validate: [/^[a-z-']+$/i, "Last name is not in valid format"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is not in valid format",
    ],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    validate: [/^[a-z -']+$/i, "Country is not in valid format"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
    validate: [/^[a-z -']+$/i, "City is not in valid format"],
  },
  street: {
    type: String,
    required: [true, "Street is required"],
    validate: [/^[a-z -'0-9]+$/i, "Street is not in valid format"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
    validate: [/[A-Za-z]+$/i, "Street is not in valid format"],
  },
  zipCode: {
    type: String,
    required: [true, "Zip Code is required"],
  },
  unitNumber: {
    type: String,
    required: [true, "Unit number is required"]
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    validate: [/[0-9]+$/i, "Phone number is not in valid format"],
  },
  productsOrdered: [
    {
      id: { type: mongoose.Types.ObjectId, ref: "Product" },
      size: String,
      quantity: Number,
    },
  ],
  price: {
    type:Number
  },
  profileId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  orderStatus: {
    type: String,
    default:'Not Delivered'
  },
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
