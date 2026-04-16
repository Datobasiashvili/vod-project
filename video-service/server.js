require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { connectDb } = require("vod-common");
const videoRoutes = require("./routes/videoRoutes");

app.use(cors());
app.use(express.json());

app.use('/', videoRoutes);

connectDb(mongoose, process.env.MONGO_URI, "VIDEO-SERVICE");

app.listen(process.env.PORT, () => {
    console.log(`[VIDEO-SERVICE] running on port: ${process.env.PORT}`);
});