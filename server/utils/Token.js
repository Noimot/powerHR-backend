import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class Token {
  /**
   * @description Method to generate token
   *
   * @param {Object} user
   *
   * @return {String} Returned token
   */
  static generateToken(tokenData) {
    return jwt.sign(tokenData, process.env.SECRET_TOKEN, {
      expiresIn: tokenData.expiryTime,
    });
  }

  static verifyToken(req, res, next) {
    const token = req.body.token || req.headers["x-access-token"];
    if (token) {
      jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
        if (error) {
          return res.status(401).send({
            status: "unauthorized",
            statusCode: 401,
          });
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      return res.status(401).send({
        status: "unauthorized",
        statusCode: 401,
      })
    }
  }
}

export default Token;