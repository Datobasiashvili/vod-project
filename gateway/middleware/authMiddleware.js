const axios = require("axios");

const authenticate = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied! No token provided." });
  }

  try {
    const response = await axios.get(`${process.env.AUTH_URL}/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.valid) {
      req.headers["x-user-id"] = response.data.userId;
      next();
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (err) {
    if (err.response) {
      console.error("Auth Service Error Data:", err.response.data);
      console.error("Auth Service Status:", err.response.status);
    } else if (err.request) {
      console.error("No response from Auth Service. Is it running?");
    } else {
      console.error("Middleware Error:", err.message);
    }
    res.status(401).json({ error: "Authentication failed!" });
  }
};

module.exports = { authenticate };
