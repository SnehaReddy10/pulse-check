import { dbConfig } from './config/db/db.config';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.development.local` });
dbConfig.init();

import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.router';
import passport from './config/passport';
import { authMiddleware } from './middlewares/auth.middleware';
import { session } from './config/session';
import { organizationRouter } from './routes/organization.router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRouter);

app.use(authMiddleware);

app.use('/api/v1/organizations', organizationRouter);

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Listening to port ${process.env.PORT ?? 3000}`);
});
