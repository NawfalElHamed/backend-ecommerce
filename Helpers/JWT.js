const jwt = require('jsonwebtoken');

class JwtManager {
  sign(payload,secretkey,expiresIn = '1h') {
    try {
      const token = jwt.sign(payload, secretkey, { expiresIn });
      return token;
    } catch (error) {
      throw error;
    }
  }

  verify(token,secretkey) {
    try {
      const decoded = jwt.verify(token,secretkey);
      return decoded;
    } catch (error) {
      throw error;
    }
  }
}


module.exports = new JwtManager