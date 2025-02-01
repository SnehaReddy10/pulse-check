export const passportMiddleware = (request: any, response: any, next: any) => {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb: any) => {
      cb();
    };
  }

  if (request.session && !request.session.save) {
    request.session.save = (cb: any) => {
      cb();
    };
  }

  next();
};
