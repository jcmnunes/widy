const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const toJson = require('@meanie/mongoose-to-json');
const handleErrors = require('./src/middlewares/handleErrors');

var cookieParser = require('cookie-parser');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT;
const ROOT_URL = `http://localhost:${port}`;

// Strip _id (send id instead) and __v from responses
mongoose.plugin(toJson);

// Models
require('./src/models/User');
require('./src/models/Day');
// Routes
const auth = require('./src/routes/auth');
const users = require('./src/routes/users');
const days = require('./src/routes/days');
const tasks = require('./src/routes/tasks');
const settings = require('./src/routes/settings');
const scopes = require('./src/routes/scopes');
const report = require('./src/routes/report');

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

// eslint-disable-next-line no-console
mongoose.connect(process.env.MONGO_URI, mongooseOptions).then(() => console.log('DB connected'));
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

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
  });
}

// Error handling from async / await functions
app.use(handleErrors);

app.listen(port, err => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${ROOT_URL}`);
});
