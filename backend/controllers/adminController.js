// controllers/adminController.js
import Order from '../models/order.js';
import Product from '../models/product.js';

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email') // show user details
      .populate('orderItems.product', 'name price');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();
    res.status(200).json({ message: 'Product removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, countInStock, imageUrl } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;
    product.imageUrl = imageUrl || product.imageUrl;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};
