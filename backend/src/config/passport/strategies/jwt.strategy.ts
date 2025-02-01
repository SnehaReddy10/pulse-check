import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../../../models/user.model';

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || '',
};

export const jwtStrategy = new JwtStrategy(opts, async function (
  jwt_payload: any,
  done: any
) {
  const user = await User.findById(jwt_payload.id).select('-password');
  done(null, user);
});
