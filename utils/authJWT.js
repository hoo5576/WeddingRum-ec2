const { verify } = require('./token');

const authJWT = (req, res, next) => {
  if (req.cookies.accessToken) {
    const token = req.cookies.accessToken; // header에서 access token을 가져옵니다.
    const result = verify(token); // token을 검증합니다.
    if (result.ok) { // token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.
      // req.id = result.id;
      // req.role = result.role;
      next();
    } else { // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
      res.status(401).send({
        ok: false,
        message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
      });
    }
  }else{
    res.status(401).send({
      ok: false,
      message: "쿠키에 토큰 없음", // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
    });
  }
};

module.exports = authJWT;