import Order from "../models/order.js";

// @desc   Create new order
// @route  POST /api/orders
// @access Private (user)
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc   Get logged in user orders
// @route  GET /api/orders/myorders
// @access Private (user)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("orderItems.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc   Update order status (Admin)
// @route  PUT /api/orders/:id/status
// @access Private (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status || order.status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
