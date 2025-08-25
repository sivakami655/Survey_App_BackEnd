//req,res,nextFunction
import type {Request,Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_KEY || "superkey";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const decoded = jwt.verify(token, JWT_KEY);
        if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};