import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userfind = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userfind) {
      res.status(400).json({
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "User registered succefully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "error registering user: " + error,
    });
  }
};
