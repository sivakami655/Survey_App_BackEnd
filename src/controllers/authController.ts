import express from "express";
import type {Request,Response} from "express";
import { registerUser, loginUser } from "../services/authService.js";
export const register = async (req:Request,res:Response)=>{
    const {firstName, lastName, email, password} = req.body;
    try {
        const result = await registerUser(firstName, lastName, email, password);
        return res.status(201).json({ message: "User registered successfully", data: result });
    } catch (error: any) {
        if (error.message === "User already exists") {
            return res.status(409).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message || "Registration failed" });
    }

}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await loginUser(email, password);
        return res.status(200).json({ message: "Login successful", token, user });
    } catch (error: any) {
        if (error.message === "Invalid email or password") {
            return res.status(401).json({ error: error.message });
        }
        return res.status(400).json({ error: error.message || "Login failed" });
    }
};
