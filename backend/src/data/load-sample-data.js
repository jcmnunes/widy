/* eslint-disable */
require('dotenv').config();
const fs = require('fs');

const mongoose = require('mongoose');
const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose.connect(process.env.MONGO_URI, mongooseOptions).then(() => console.log('DB connected'));
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`);
});

// import all of our models - they need to be imported only once
const { Day } = require('../models/Day');
const { User } = require('../models/User');

const days = JSON.parse(fs.readFileSync(__dirname + '/days.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Day.remove();
  await User.remove();
  console.log('Data Deleted. To load sample data, run\n\n\t npm run sample\n\n');
  process.exit();
}

async function loadData() {
  try {
    await Day.insertMany(days);
    await User.insertMany(users);
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch (e) {
    console.log(
      '\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run delete\n\n\n',
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
