import express from "express";
import { checkUser, checkUserJoin, creatUser, findUser, findUserEmail, joingyear, roles, updateUserPass, userAge } from "../controller/user.controller";
import validate from "../middleware/validate";
import { userType } from "../zod.schema/zod.user";
let router = express.Router();


router.post('/',validate(userType),creatUser)
router.get('/:id',findUser)
router.get('/emali/:email',findUserEmail)
router.get('/age/:age', userAge);
router.get("/r/:role",roles)
//router.get("/",checkUser)
router.put("/up/:id",updateUserPass)
//router.get('/',checkUserJoin)
router.get('/year/:joiningYear',joingyear)








export default router;