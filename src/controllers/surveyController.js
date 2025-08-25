import express from "express";
import { getQuestions } from "../services/surveyService.js";
import { submitResponses } from "../services/surveyService.js";
export const getAllQuestions = async (req, res) => {
    try {
        const questions = await getQuestions();
        return res.status(200).json({ data: questions });
    }
    catch (error) {
        return res.status(500).json({ error: error.message || "Failed to fetch questions" });
    }
};
export const sumbitResponse = async (req, res) => {
    try {
        // userId from req.user (set by auth middleware)
        const userId = req.user?.userId;
        const { questionId, value } = req.body;
        if (!userId || !questionId || !value) {
            return res.status(400).json({ error: "userId, questionId, and value are required" });
        }
        const response = await submitResponses(userId, questionId, value);
        return res.status(201).json({ message: "Response submitted", data: response });
    }
    catch (error) {
        return res.status(500).json({ error: error.message || "Failed to submit response" });
    }
};
//# sourceMappingURL=surveyController.js.map