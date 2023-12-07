require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./configs/db');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middleware/verifyToken');
const credentials = require('./middleware/credentials');
const corsOptions = require('./configs/corsOptions');
const cors = require('cors');

connectDB();

// allow cookies data
app.use(cookieParser());

// custom middeleware
app.use(express.urlencoded({ extended: true }));

// allow json data
app.use(express.json());

// allow cors
app.use(cors(corsOptions));

// app.use(credentials);

app.use('/register', require('./routes/registerRoute'));
app.use('/auth', require('./routes/authRoute'));
app.use('/logout', require('./routes/logoutRoute'));
app.use('/refresh', require('./routes/refreshRoute'));

app.use(verifyToken);
app.use('/users', require('./routes/usersRoute'));
app.use('/api/employee', require('./routes/api/employeesRoute'));

mongoose.connection.once('open', () => {
  console.log('database connected!.');
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
