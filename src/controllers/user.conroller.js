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
