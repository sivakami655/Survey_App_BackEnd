import express from "express";
import type { Request, Response } from "express";
import { getQuestions } from "../services/surveyService.js";
import { submitResponses } from "../services/surveyService.js";

export const getAllQuestions = async (req: Request, res: Response) => {
	try {
		const questions = await getQuestions();
		return res.status(200).json({ data: questions });
	} catch (error: any) {
		return res.status(500).json({ error: error.message || "Failed to fetch questions" });
	}
};


export const sumbitResponse = async (req: Request, res: Response) => {
	try {
		// userId from req.user (set by auth middleware)
		const userId = (req as any).user?.userId;
		const { questionId, value } = req.body;
		if (!userId || !questionId || !value) {
			return res.status(400).json({ error: "userId, questionId, and value are required" });
		}
		const response = await submitResponses(userId, questionId, value);
		return res.status(201).json({ message: "Response submitted", data: response });
	} catch (error: any) {
		return res.status(500).json({ error: error.message || "Failed to submit response" });
	}
};













