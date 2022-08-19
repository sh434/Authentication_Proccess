const  jwt = require('jsonwebtoken');
const secret =  "Youth_is_ready"
exports.generate_token = (data, expiresIn = "1d") => {
    return jwt.sign({ data }, "Youth_is_ready", { expiresIn });
  };

exports.token_parser = async(req, res, next) => {

  const {token} = req.query;
  try {
    const decoded = await Promise.resolve(jwt.verify(token, secret));
     req.body.token = decoded;
     next();
  } catch (error) {
    next(error);
  }
  
}