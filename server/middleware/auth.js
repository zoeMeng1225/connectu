import jwt from 'jsonwebtoken';

const secret = 'test';

//do sth and move next one
const auth = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;
    if(token && isCustomAuth){
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else{
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; //sub: google's name for a spcific id
    }
    next();
  } catch (error) {
    console.log(error);
  }
}

export default auth;
