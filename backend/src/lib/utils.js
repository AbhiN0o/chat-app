import jsonwebtoken from "jsonwebtoken"

export const generateToken=(userId,res)=>{
    
    const token=jsonwebtoken.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("token",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,//Prevents XSS attack
        sameSite:"strict",//Prevents CSRF attack
        secure:process.env.NODE_ENV!=="development"//this allows only https but as we are in develpment we dont want it , once we deploy it we cna jsut set our env var as deploy adn enable https
    })
    return token;
}
