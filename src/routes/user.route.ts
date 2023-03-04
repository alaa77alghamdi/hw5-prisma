import express from "express";
import { creatUser, findUser, findUserEmail, userAge } from "../controller/user.controller";
import validate from "../middleware/validate";
import { userType } from "../zod.schema/zod.user";
let router = express.Router();


router.post('/',validate(userType),creatUser)
router.get('/:id',findUser)
router.get('/:email',findUserEmail)
router.get("/:age",userAge)







export default router;