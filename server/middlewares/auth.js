const jwt = require('jsonwebtoken');

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


module.exports = {
  verifyToken,
  verifyAdminRole
}