const Test = require("../models/Test");
const jwt = require('jsonwebtoken');

module.exports.getTests = async (req, res) => {
  let tests = await Test.find({}).sort({ createdAt: -1});
  console.log(tests)
  res.render('dashboard', { tests })
}

module.exports.postTest = async (req, res) => {
  const { title, categories, test } = req.body;

  const token = req.cookies.jwt;
  let teacherRef;

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      // Handle token verification error
      res.sendStatus(403);
    } else {
      let teacherRef = decodedToken.id;
      try {
        const createdTest = await Test.create({ teacherRef, title, categories, test})
        if (createdTest) {
          console.log('createdTest: ', createdTest)
          res.redirect('/tests');
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  });  
}

module.exports.deleteTest = async (req, res) => {
  let testId = req.params.testId;
  console.log('testId', testId)

  try {
    const test = await Test.findByIdAndRemove(testId);
    if (test) {
      console.log('deletedTest: ', testId)
      res.redirect('/tests');
    }
  }
  catch(err) {
    console.log(err)
  }
}

module.exports.getNewTest = (req, res) => {
  res.render('new')
}

module.exports.getTestById = async (req, res) => {
  console.log('yy')
  let testId = req.params.testId;
  console.log('here')
  try {
    const test = await Test.findById(testId);
    if (test) {
      console.log('foundTest: ', testId)
      res.render('new');
    }
  }
  catch(err) {
    console.log(err)
  }
}