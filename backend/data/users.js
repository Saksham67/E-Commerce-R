import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "admin",
    phone: "9999999999",
    address: "Admin Street, City, Country",
  },
  {
    name: "Shahana Parveen",
    email: "shahana@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
    phone: "8888888888",
    address: "123 Main Street, City, Country",
  },
  {
    name: "Test User",
    email: "test@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
    phone: "7777777777",
    address: "456 Park Avenue, City, Country",
  },
];

export default users;
