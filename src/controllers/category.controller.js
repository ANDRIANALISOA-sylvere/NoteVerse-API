import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: {
        name,
        User: {
          connect: {
            id: req.user.id,
          },
        },
      },
      include: {
        User: true,
      },
    });

    return res.json(category);
  } catch (error) {
    return res.status(500).json({
      message: "error creating category: " + error,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
      include: {
        notes: true,
        User: true,
      },
    });

    return res.json(category);
  } catch (error) {
    return res.status(500).json({
      message: "error updating category",
    });
  }
};

