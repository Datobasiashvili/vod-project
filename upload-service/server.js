const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const uploadRoutes = require("./routes/uploadRoutes");
require("dotenv").config()

app.use(cors());
app.use(express.json());
app.use('/', uploadRoutes);

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB: vod_system");
    } catch (err){
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
}

connectDb();

PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`[UPLOAD-SERVICE] running on port: ${PORT}`);
});