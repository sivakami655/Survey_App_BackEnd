
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const submitResponses = async (userId: number | string, questionId: number, value: string) => {
	// Save response in the Response table
	return await prisma.response.create({
		data: {
			value,
			userId: Number(userId),
			questionId: Number(questionId)
		}
	});
};


export const getQuestions = async () => {
    return await prisma.question.findMany({
        include: {
            options: true
        }
    });
};
