import cookieSession from 'cookie-session';

export const session = cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY1 || '', process.env.SESSION_KEY2 || ''],
  maxAge: 60 * 1000,
  httpOnly: true,
});
