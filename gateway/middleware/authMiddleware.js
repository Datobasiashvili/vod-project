const axios = require("axios");
const AUTH_URL = process.env.AUTH_URL;

const authenticate = async (req, res, next) => {
    const token = req.cookies.token; 

    if (!token) {
        return res.status(401).json({ error: "Access denied! No token provided." });
    }

    try {
        const response = await axios.get(`${AUTH_URL}/verify`, {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        });

        if (response.data.valid) {
            req.headers["x-user-id"] = response.data.userId;
            next();
        } else {
            res.status(401).json({ error: "Invalid token" });
        }
    } catch (err) {
        console.error("Auth Middleware Error:", err.message);
        res.status(401).json({ error: "Authentication failed" });
    }
};

module.exports = { authenticate };