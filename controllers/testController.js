const Test = require("../models/Test");
const jwt = require('jsonwebtoken');

module.exports.getTests = async (req, res) => {
  let tests = await Test.find({})
  console.log(tests)
  res.render('dashboard', { tests })
}

module.exports.postTest = async (req, res) => {
  const { title, categories, test } = req.body;

  const token = req.cookies.jwt;
  let teacherRef;

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      // Handle token verification error
      res.sendStatus(403);
    } else {
      teacherRef = decodedToken.id;
    }
  })

  try {
    const createdTest = await Test.create({ teacherRef, title, categories, test})
    console.log(createdTest);
  }
  catch (err) {
    console.log(err);
  }
}

module.exports.getNewTest = (req, res) => {
  res.render('new')
}