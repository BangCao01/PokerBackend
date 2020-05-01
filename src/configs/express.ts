import cookieParser from 'cookie-parser';
import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import { join } from 'path';
import fileUploadRouter from '../common/file.upload.routes';
import authGoogleRouter from '../common/googledrive.auth';

import router from './routes';

import KEYS from '../configs/keys';
import passportConfig from '../configs/passport';
import passport from 'passport';
import cookieSession from 'cookie-session';

const app: express.Application = express();

loadConfigs();

loadViews();

loadRoutes();

export default app;

function loadRoutes() {
  app.use('/api', router);
  app.use('/auth', authGoogleRouter);
  app.use('/attach', fileUploadRouter);
}

function loadViews() {
  app.use(express.static(join(__dirname, '../public')));
}

function loadConfigs() {
  app.use(logger('dev'));
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());
  // init session
  app.use(
    cookieSession({
      keys: [KEYS.session_key],
    }),
  );

  // init passport
  app.use(passport.initialize());
  app.use(passport.session());
}
