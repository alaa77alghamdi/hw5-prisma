import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prisma from "../config/db";
import { Request, Response } from "express";
import { Role } from "@prisma/client";

export const creatUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    await prisma.user.create({
      data: user,
    });

    return res.json({
      message: "add user",
    });
  } catch (error) {
    console.log(error);
  }
};

export const findUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        password: false,
        email: true,
        role: true,
        joiningYear: true,
        age: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const findUserEmail = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.params.email,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const userAge = async (req: Request, res: Response) => {
  try {

    const age = parseInt(req.params.age);

    const users = await prisma.user.findMany({
      where: {
        age: {
          gt: age,
        },
      },
    });

    res.json(users);
  } catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    if (prismaError.code == "P2002") {
      return res.status(400).json({
        message: prismaError.message,
      });
    }
  }
};

export const roles = async (req: Request, res: Response) => {
  try {
    const role = req.params.role.toUpperCase() as Role;
    const user = await prisma.user.count({
      where: {
        role,
      },
    });

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const checkUser = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user?.password !== password) {
      res.json("user is no recored password");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUserPass = async (req: Request, res: Response) => {
  try {
    const userid = req.params.id;
    const password = req.body.password;
    const user = await prisma.user.update({
      where: {
        id: userid,
      },

      data: { password },
    });
    res.json(user);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};


export const checkUserJoin = async (req: Request, res: Response) => {
    try {
      const { id, joiningYear } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      res.json("user is joined");

      
      if (user?.joiningYear !== joiningYear) {
        res.json("user is not joined");
      }
    } catch (error) {
      console.log(error);
    }
  };





  export const joingyear = async (req: Request, res: Response) => {
    try {
  
      const year = req.params.joiningYear;
  
      const users = await prisma.user.findMany({
        where: {
           joiningYear: year,
        },
      });
  
      res.json(users);
    } catch (error) {
      const prismaError = error as PrismaClientKnownRequestError;
      if (prismaError.code == "P2002") {
        return res.status(400).json({
          message: prismaError.message,
        });
      }
    }
  };