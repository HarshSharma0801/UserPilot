import jwt from "jsonwebtoken";

const accessKey = process.env.JWTACCESS;

const AuthenticateToken = (req, res, next) => {
    const  authHeader= req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    
  
    if (!token) {
      console.log("no token")
      return res.status(200).json({valid:false}); 
    }
  
    jwt.verify(token, accessKey, (err, user) => {
      if (err) {
        return res.sendstatus(403); // Forbidden
      }
      req.user = user;
      next();
    });
  };


  export default AuthenticateToken