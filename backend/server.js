const express = require('express');
const app = express();
const mongoose = require("mongoose");



const MONGO_URL = "mongodb://127.0.0.1:27017/";

mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to the DB"))
  .catch(err => console.error("DB connection error:", err));

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});


app.get("/" , (req,res) =>{
    res.send("app is running");
})

app.listen(8080, () =>{
    console.log(`port is running ${8080}`)
})