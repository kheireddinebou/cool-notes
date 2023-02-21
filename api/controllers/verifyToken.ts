import { Request, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user: JwtPayload;
}

const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.cookies.access_token;

  if (token) {
    jwt.verify(token, process.env.JWT_SEC as string, (err: any, user: any) => {
      if (err) res.status(403).json("Token is not valid!");
      (req as AuthRequest).user = user;
      next();
    });
  } else {
    return res.status(403).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorisation: RequestHandler = (req, res, next) => {
  verifyToken(req, res, () => {
    if ((req as AuthRequest).user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("You are not authorised");
    }
  });
};

export { verifyToken, verifyTokenAndAuthorisation };
