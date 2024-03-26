const mongoose = require('mongoose');
mongoose.set('strictQuery',false)
const url = "mongodb+srv://sriharijagan333:TtNo9xopOBbtIUni@cluster0.2xscnr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("DB is connected Successfully...");
    } catch (err) {
        console.error("Error connecting to DB:", err);
    }
}

module.exports = connectDB;

// // Call the connectDB function to establish the connection
connectDB();
