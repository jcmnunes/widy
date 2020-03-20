import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';
import toJson from '@meanie/mongoose-to-json';
import handleErrors from './middlewares/handleErrors';
import cookieParser from 'cookie-parser';
import path from 'path';

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT;
const ROOT_URL = `http://localhost:${port}`;

// Strip _id (send id instead) and __v from responses
mongoose.plugin(toJson);

// Models
require('./models/User');
require('./models/Day');
// Routes
import auth from './routes/auth';
import users from './routes/users';
import days from './routes/days';
import tasks from './routes/tasks';
import settings from './routes/settings';
import scopes from './routes/scopes';
import report from './routes/report';

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

// eslint-disable-next-line no-console
mongoose
  .connect(process.env.MONGO_URI!, mongooseOptions)
  .then(() => console.log('DB connected'));

mongoose.connection.on('error', err => {
  // eslint-disable-next-line no-console
  console.log(`DB connection error: ${err.message}`);
});

const app = express();

if (!dev) {
  app.use(helmet());
  app.use(compression());
  app.set('trust proxy', 1);
}

app.use(express.json());
app.use(cookieParser());

// Routers
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/days', days);
app.use('/api/tasks', tasks);
app.use('/api/settings', settings);
app.use('/api/scopes', scopes);
app.use('/api/report', report);

if (!dev) {
  app.use(express.static('../frontend/build'));
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
  });
}

// Error handling from async / await functions
app.use(handleErrors);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${ROOT_URL}`);
});
