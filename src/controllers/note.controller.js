import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getNotesByUser = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "error fetching user notes",
    });
  }
};
