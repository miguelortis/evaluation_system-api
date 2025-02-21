const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      const token = req?.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        return res?.status(401)?.send("Access Denied");
      }

      try {
        const verified = jwt.verify(token, `${process.env.SECRET_KEY}`);
        req.user = verified;
        next();
      } catch (err) {
        console.error("Token verification failed:", err);
        res.status(400)?.send("Invalid Token");
      }
    },
    (req, res, next) => {
      if (roles?.length && !roles?.includes(req?.user?.role)) {
        return res?.status(403).send("Access Denied");
      }
      next();
    },
  ];
};

module.exports = auth;
