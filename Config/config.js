require('dotenv').config()

module.exports = {
    server: {
      PORT: process.env.PORT || 5000, 
      hostname: 'localhost', 
    },
    database: {
      uri: process.env.MONGO_URI, 
      options:{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    },
    color:{
        green:"\x1b[32m",
        red:"\x1b[31m",
    },
    user: {
      email:process.env.EMAIL_USER,
      password:process.env.PASSWORD_USER
    },
    notFoundTemplate: '404', 
    jwtSecret: process.env.JWT_SECRET_KEY || 'your-secret-key', 
  };