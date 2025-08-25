import express from "express";
import { getAllQuestions, sumbitResponse } from "../controllers/surveyController.js";
import { authenticate } from "../middleware/middleware.js";

const router = express.Router();

// Get all questions
router.get("/questions", authenticate, getAllQuestions);

// Submit a response
router.post("/response", authenticate, sumbitResponse);

export default router;
