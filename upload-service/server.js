const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");
const { connectDb } = require("vod-common");
require("dotenv").config()

app.use(cors());

app.use('/', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDb(mongoose, process.env.MONGO_URI, "UPLOAD-SERVICE");

PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`[UPLOAD-SERVICE] running on port: ${PORT}`);
});