import jwt from "jsonwebtoken";
const JWT_KEY = process.env.JWT_KEY || "superkey";
export function generateToken(userId) {
    const payload = { userId };
    // Token expires in 7 days (adjust as needed)
    return jwt.sign(payload, JWT_KEY, { expiresIn: '2h' });
}
//# sourceMappingURL=jwt.js.map