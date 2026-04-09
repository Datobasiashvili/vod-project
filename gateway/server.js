const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const axios = require("axios");
const { authenticate } = require("./middleware/authMiddleware");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(cookieParser());

app.use('/api/auth', createProxyMiddleware({
    target: process.env.AUTH_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' }
}));

app.use('/api/video', createProxyMiddleware({
    target: process.env.VIDEO_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/video': '' }
}));

app.use('/api/upload', authenticate, createProxyMiddleware({
    target: process.env.UPLOAD_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/upload': '' }
}));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`[GATEWAY] running on port: ${PORT}`);
});
