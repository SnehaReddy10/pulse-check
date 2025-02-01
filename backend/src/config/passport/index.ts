import passport from 'passport';
import { jwtStrategy } from './strategies/jwt.strategy';

passport.use(jwtStrategy);

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

export default passport;
