import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.quiz.create({
    data: {
      title: "Sample Quiz",
      description: "Basic math quiz",
      questions: {
        create: [
          {
            text: "What is 2 + 2?",
            options: {
              create: [
                { text: "3", isCorrect: false },
                { text: "4", isCorrect: true },
                { text: "5", isCorrect: false },
              ],
            },
          },
          {
            text: "What is 10 / 2?",
            options: {
              create: [
                { text: "2", isCorrect: false },
                { text: "5", isCorrect: true },
                { text: "10", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .then(() => console.log("Seed complete"))
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
