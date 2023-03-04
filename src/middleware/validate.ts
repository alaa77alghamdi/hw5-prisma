import { Request,NextFunction,Response, query} from "express";
import { AnyZodObject, ZodError } from "zod";




const validate =(schema:AnyZodObject)=>( req:Request ,res:Response,next:NextFunction) =>
{

    try{
schema.parse({
    body:req.body,
    params:req.params,
    query:req.query,
    headers:req.headers,
    
});
next();


    }
    catch(e){
  const zoderror = e as ZodError
return res.status(400).json({
    
    message:zoderror.errors[0].message,
    

});
    }
};


export default validate;