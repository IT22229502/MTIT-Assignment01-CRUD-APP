import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;