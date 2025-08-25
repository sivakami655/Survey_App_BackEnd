import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt.js";
const prisma = new PrismaClient();
export const loginUser = async (email, password) => {
    // Validate email and password presence
    if (!email || typeof email !== 'string') {
        throw new Error('Email is required.');
    }
    if (!password || typeof password !== 'string') {
        throw new Error('Password is required.');
    }
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    // Optionally, do not return password hash
    //generate a token
    const token = generateToken(user.id);
    return { user, token };
};
export const registerUser = async (firstName, lastName, email, password) => {
    // Validate firstName
    if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
        throw new Error('First name is required.');
    }
    // Last name can be null, but if provided, must be a string
    if (lastName !== null && lastName !== undefined && typeof lastName !== 'string') {
        throw new Error('Last name must be a string or null.');
    }
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        throw new Error('A valid email is required.');
    }
    // Validate password
    // At least 1 number, 1 lowercase, 1 uppercase, 1 special character, min 8 chars
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!password || typeof password !== 'string' || !passwordRegex.test(password)) {
        throw new Error('Password must be at least 8 characters long and include at least 1 number, 1 lowercase, 1 uppercase, and 1 special character.');
    }
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });
        if (existingUser) {
            throw new Error("User already exists");
        }
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const res = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        });
        return res;
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=authService.js.map