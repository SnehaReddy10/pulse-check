import { NextFunction, Response, Request } from 'express';
import passport from '../config/passport';
import { Strategy } from '../constants/enums/strategy';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  passport.authenticate(Strategy.JWT, { session: false })(req, res, next);
}
