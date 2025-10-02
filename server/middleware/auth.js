import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_KEY);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};
