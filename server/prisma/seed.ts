import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    await model.deleteMany({});
    console.log(`Cleared data from ${modelName}`);
  }
}

// Fix for unique constraint error (id) 
// Updates sequences to the max ID
// This way PostgreSQL's autoincrement starts at the correct (max) value
async function syncSequences() {
  const sequences = [
    { table: "Team", column: "id" },
    { table: "Project", column: "id" },
    { table: "ProjectTeam", column: "id" },
    { table: "User", column: "userId" },
    { table: "Task", column: "id" },
    { table: "Attachment", column: "id" },
    { table: "Comment", column: "id" },
    { table: "TaskAssignment", column: "id" },
  ];

  for (const { table, column } of sequences) {
    const sequenceName = `"${table}_${column}_seq"`;
    const sql = `
      SELECT setval('${sequenceName}', COALESCE((SELECT MAX("${column}") FROM "${table}"), 1));
    `;
    await prisma.$executeRawUnsafe(sql);
    console.log(`Sequence synced for ${table}`);
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "team.json",
    "project.json",
    "projectTeam.json",
    "user.json",
    "task.json",
    "attachment.json",
    "comment.json",
    "taskAssignment.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    for (const data of jsonData) {
      await model.create({ data });
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }

  await syncSequences();
}

main()
  .catch((err) => console.error(err))
  .finally(async () => await prisma.$disconnect());
