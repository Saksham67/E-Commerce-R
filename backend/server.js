const express = require('express');
const app = express();
const mongoose = require("mongoose");





app.get("/" , (req,res) =>{
    res.send("app is running");
})

app.listen(8080, () =>{
    console.log(`port is running ${8080}`)
})