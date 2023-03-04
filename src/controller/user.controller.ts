import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prisma from "../config/db";
import { Request, Response } from "express";

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


export const userAge= async (req: Request, res: Response) => {
try {
   const age=req.params;
 const user =await prisma.user.findMany({
   
    
            where:{
    age
            }
        })
        console.log(user);
    
} catch (error) {
    const prismaError = error as PrismaClientKnownRequestError;
    if (prismaError.code == 'P2002') {
      return res.status(400).json({
        message: ' ',
      });
}
}}









/*export const roles = async (req: Request, res: Response) => {

    const { username } = req.body;
    const user = await prisma.user.findMany({

        where: {
            username:username
        },
        return:
        if(role==)
    })

}*/

