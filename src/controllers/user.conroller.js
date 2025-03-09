import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        notes:true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "error fetching user",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      message: "error fetching user: " + error,
    });
  }
};
