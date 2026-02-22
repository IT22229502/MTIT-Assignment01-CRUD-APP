import Product from "../models/Product.js";
import mongoose from "mongoose";

/**
 * @desc    Create Product
 * @route   POST /api/products
 */
export const createProduct = async (req, res) => {
  try {
    let { productName, price, stockQuantity } = req.body;

    // 1. Data Normalization: Capitalize the first letter of each word in the product name
    // This ensures "iphone 15" is saved as "Iphone 15" for a better UI.
    if (productName) {
      productName = productName
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    // 2. Fallback Value: Ensure stockQuantity is at least 0 if the user forgets to send it
    stockQuantity = stockQuantity || 0;

    // 3. Detailed Field Validation for Frontend
    if (!productName || productName.length < 3) {
       return res.status(400).json({ 
         error: "Validation Failed", 
         message: "Product name must be at least 3 characters long." 
       });
    }

    const product = await Product.create({
      productName,
      price,
      stockQuantity,
    });

    res.status(201).json(product);
  } catch (error) {
    // 4. Manually handling Mongoose Duplicate Key Errors (e.g., if a product name must be unique)
    if (error.code === 11000) {
      return res.status(400).json({ message: "A product with this name already exists." });
    }
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc    Get All Products
 * @route   GET /api/products
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Get Single Product
 * @route   GET /api/products/:id
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Update Product
 * @route   PUT /api/products/:id
 */
export const updateProduct = async (req, res) => {
  try {
    const { productName, price, stockQuantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.productName = productName ?? product.productName;
    product.price = price ?? product.price;
    product.stockQuantity = stockQuantity ?? product.stockQuantity;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Delete Product
 * @route   DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
try {
    const { id } = req.params;

    // --- DEBUG FIX START ---
    // Validate the ID format to prevent Mongoose from crashing with a CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Product ID format" });
    }
    // --- DEBUG FIX END ---

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};