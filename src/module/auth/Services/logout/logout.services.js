import User from "../../../../DB/model/User/user.model.js";
import { successResponse } from "../../../../utils/response/success.response.js";
import { compareHash } from "../../../../utils/security/hash/hash.js";
import { verifyToken } from "../../../../utils/security/Token/token.js";
import crypto from "crypto";

export const logOut = async (req, res, next) => {
  const { email, password } = req.body;
  const authHeader = req.headers.authorization;
  const tokenBlacklist = new Set();
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // تحقق شكلي من البيانات (يمكن استخدام bcrypt في الإنتاج)
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  // إبطال التوكن
  tokenBlacklist.add(token);
  res.json({ message: "Logged out successfully" });
}
