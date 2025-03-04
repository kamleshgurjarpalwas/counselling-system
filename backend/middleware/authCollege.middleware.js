const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token; 

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.college = decoded;

        next();

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        }
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
