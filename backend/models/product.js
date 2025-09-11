import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/150", // fallback image
    },
    stock: {
      type: Number,
      required: [true, "Please enter stock quantity"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please enter category"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
