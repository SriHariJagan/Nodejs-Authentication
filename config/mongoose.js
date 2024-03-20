const mongoose = require('mongoose');
const url = "mongodb+srv://sriharijagan333:o8J4s6T2i23my8q1@cluster0.2xscnr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url);
const db = mongoose.connection;

db.on('error',(err) => {console.log(err)});
db.on('open',() => {console.log("DB is connected Successfully...")});

module.exports = db;
