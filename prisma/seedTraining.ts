import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import fs from "fs";
import path from "path";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding training data...");

  await prisma.trainingData.deleteMany();

  const filePath = path.join(__dirname, "../training_data.csv");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n").filter((line) => line.trim() !== "");

  const rows = lines.slice(1);

  for (const line of rows) {
    const [animal, symptoms, disease] = line.split(",");
    if (animal && symptoms && disease) {
      await prisma.trainingData.create({
        data: {
          animal: animal.trim(),
          symptoms: symptoms.trim(),
          disease: disease.trim(),
        },
      });
    }
  }

  console.log(`✅ Seeded ${rows.length} training rows`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());