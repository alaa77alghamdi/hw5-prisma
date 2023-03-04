import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
    log: ["query"],

    errorFormat: "minimal",


});

const connectDB = async () => {


    try {
         prisma.$connect();
         console.log("databease connection!");
         
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}
export {connectDB} ;
export default prisma;