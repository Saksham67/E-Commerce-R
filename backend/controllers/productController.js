// backend/controllers/productController.js
import Product from "../models/product.js";

/**
 * @desc   Get all products
 * @route  GET /api/products
 * @access Public
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("getProducts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get single product by ID
 * @route  GET /api/products/:id
 * @access Public
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);
    return res.status(404).json({ message: "Product not found" });
  } catch (error) {
    console.error("getProductById error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Create a product
 * @route  POST /api/products
 * @access Admin
 */
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("createProduct error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Update product
 * @route  PUT /api/products/:id
 * @access Admin
 */
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    product.imageUrl = imageUrl || product.imageUrl;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("updateProduct error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Delete product
 * @route  DELETE /api/products/:id
 * @access Admin
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error("deleteProduct error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
