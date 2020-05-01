const { Router } = require('express');
const passport = require('passport');
const passportConfig = require('../configs/passport');
const session = require('express-session');
const CLIENT_CREATE_PROJECT_PAGE_URL =
  'http://localhost:3001/createProject?googleAuthenticated=true';

const CLIENT_BASE_URL = 'http://localhost:3001/';

let authGoogleRouter = Router();
passport.initialize();
passport.session();
// when login is successful, retrieve user info
authGoogleRouter.get('/login/success', (req, res) => {
  if (req.user) {
	let url = CLIENT_BASE_URL + req.session.callBack + '&googleAuthenticated=true';
	console.log(url);
    res.redirect(url);
	/*
    res.json({
       success: true,
       message: 'user has successfully authenticated',
       user: req.user,
       cookies: req.cookies,
     });
	 */
  }
});

// when login failed, send failed msg
authGoogleRouter.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
});

// When logout, redirect to client
authGoogleRouter.get('/relogin', (req, res) => {
  req.logout();
  console.log('req = ' + req);
  res.redirect('/auth/login?callBack=' + req.query.callBack);
});

// When logout, redirect to client
authGoogleRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect(CLIENT_CREATE_PROJECT_PAGE_URL);
});

// redirect to home page after successfully login via twitter
authGoogleRouter.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: '/auth/login/success', //CLIENT_BASE_URL + req.session.callBack,
    failureRedirect: '/auth/login/failed',
  }),
);

// init router for auth
authGoogleRouter.get('/login', function(req, res) {
  req.session.callBack = req.query.callBack;
  let url = CLIENT_BASE_URL + req.session.callBack + '&googleAuthenticated=true';
  if (req.user) res.redirect(url);
  // if auth
  else res.redirect('/auth/login/google'); // if not auth
});

// login redirect
// authGoogleRouter.get(
//   '/login/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'https://www.googleapis.com/auth/drive.file', 'email'],
//   }),
// );

// login redirect
authGoogleRouter.get(
  '/login/google',
  passport.authenticate('google', {
    scope: ['profile', 'https://www.googleapis.com/auth/drive.file', 'email'],
  }),
);

// // callback from google oauth (with token)
// authGoogleRouter.get(
//   '/google/redirect',
//   passport.authenticate('google'),
//   function(req, res) {
//     res.redirect('/login/success');
//   },
// );

module.exports = authGoogleRouter;
