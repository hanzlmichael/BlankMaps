const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes')
const cookieParser = require('cookie-parser');
require('dotenv').config()
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express()

// view engine 
app.set('view engine', 'ejs')

// middleware
app.use(express.static('public'));
app.use(express.json({ limit: '10mb'}));
app.use(cookieParser());

// databaze
const dbURI = process.env.DB_CONNECT;
/* mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
 */
mongoose.connect(dbURI)
  .then(() => app.listen(3210))
  .catch((err) => console.log(err))
// routes


app.get('*', checkUser);
app.get('/', (req, res) => res.render('index'));
//app.get('/tests', requireAuth, (req, res) => res.render('tests', {tests}));
app.use('/tests', testRoutes);
app.use(authRoutes);
//app.use(testRoutes)