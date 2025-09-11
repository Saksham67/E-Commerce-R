import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/user.js";
import Product from "./models/product.js";
import Order from "./models/order.js";
import connectDB from "./config/db.js";

dotenv.config();

const importData = async () => {
  try {
    // Clear old data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Insert products (owned by admin)
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; // optional
    });
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(` Error: ${error}`);
    process.exit(1);
  }
};

const runSeeder = async () => {
  await connectDB();

  if (process.argv[2] === "-d") {
    await destroyData();
  } else {
    await importData();
  }
};

runSeeder();
