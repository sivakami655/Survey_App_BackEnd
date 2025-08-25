import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function main() {
  const filePath = path.resolve(__dirname, "./data/questions.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const questions = JSON.parse(fileContent);
  for (const q of questions) {
    const createdQuestion = await prisma.question.create({
      data: {
        title: q.title,
        description: q.description,
        isRequired: q.isRequired,
        inputType: q.inputType,
        options: {
          create: q.options.map((opt: any) => ({ value: opt.value }))
        }
      }
    });
    console.log(`Created question: ${createdQuestion.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
