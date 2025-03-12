const jwt = require("jsonwebtoken");
exports.prevent = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      const err = new Error("Unauthorized");
      err.status = 403;
      err.code = "Unauth";
      return next(err);
    }
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if(err){
            const errMsg = new Error(err.message);
            errMsg.status = 401;
            errMsg.code = "Inavlid_Token";
            return next(errMsg);
        }
      if (!user) {
        const err = new Error("Unauthorized");
        err.status = 401;
        err.code = "Unauthorized";
        return next(err);
      }
      req.user = user;
      next();
    });
  } catch (error) {
    const errMsg = new Error(error.message);
    errMsg.status = error.status;
    errMsg.code = "Inavlid_Token";
    return next(errMsg);
  }
};
