import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      return res.status(400).json({
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
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json({
      message: "User registered succefully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error registering user: " + error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      access_token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error logging in: " + error,
    });
  }
};
