import expressJwt from 'express-jwt';
import UserService from '../main/users/user.service';

module.exports = jwt;
const userService = new UserService();
function jwt() {
  const secret: string = 'ANYKEYSTRING';
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate',
      '/users/register',
    ],
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.get('payload.sub');

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}

export default jwt;
