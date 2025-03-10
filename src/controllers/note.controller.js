import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNote = async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    const notes = await prisma.note.create({
      data: {
        title,
        content,
        User: {
          connect: {
            id: req.user.id,
          },
        },
        Category: {
          connect: {
            id: categoryId,
          },
        },
      },
      include: {
        User: true,
        Category: true,
      },
    });

    return res.json(notes);
  } catch (error) {
    return res.status(500).json({
      message: "error creating note",
    });
  }
};

export const getNotesByUser = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: {
        userId: req.user.id,
      },
    });

    return res.json(notes);
  } catch (error) {
    return res.status(500).json({
      message: "error fetching user notes",
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categoryId } = req.body;
    const notes = await prisma.note.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        Category: {
          connect: {
            id: categoryId,
          },
        },
      },
      include: {
        User: true,
        Category: true,
      },
    });

    return res.json(notes);
  } catch (error) {
    return res.status(500).json({
      message: "error updating notes",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await prisma.note.delete({
      where: {
        id,
      },
      include: {
        User: true,
        Category: true,
      },
    });

    return res.json(note);
  } catch (error) {
    return res.status(500).json({
      message: "error deleting note",
    });
  }
};
