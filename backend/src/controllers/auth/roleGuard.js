const createError = require('http-errors');
module.exports = (role) => {
  return (req, res, next) => {    
    if (req.user.role < role) {
      return next(new createError.Forbidden('You are not allowed to access this resource'));
    }
    next();
  }  
};
