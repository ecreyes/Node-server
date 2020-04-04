const jwt = require('jsonwebtoken');
const Course = require("../models/course");

const verifyToken = (req, res, next) => {
  let token = req.get('token');
  jwt.verify(token, process.env.JWTSeed, (error, decoded) => {
    if (error) {
      return res.json({
        ok: false,
        error
      });
    }
    req.user = decoded.user;
    next();
  });

}

const verifyAdminRole = (req, res, next) => {
  if(req.user.role=="ADMIN_ROLE"){
    next();
  }else{
    return res.json({
      ok:false,
      error: "ROLE NOT VALID"
    });
  }
}

const verifyProfessorRole = (req,res,next)=>{
  let userId = req.user._id;
  let courseID = req.body.id;
  if(req.user.role=="ADMIN_ROLE"){
    next();
  }else{
    Course.findOne({_id:courseID,professors:userId},(error,courseDB)=>{
      if(error){
        return res.json({ok:false,message:error});
      }
      if(!courseDB){
        return res.json({ok:false,message:"permission denied"});
      }
      next();
    });
  }
}


module.exports = {
  verifyToken,
  verifyAdminRole,
  verifyProfessorRole
}