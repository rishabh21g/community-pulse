import jwt from "jsonwebtoken";

const generateToken=(id)=>{
    jwt.sign({id} , process.env.JWT_SECRET_KEY ,{
        expiresIn:"14d"
    })

}

export default generateToken