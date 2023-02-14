const Test = require("../models/Test");

module.exports.getTests = async (req, res) => {
  let tests = await Test.find({})
  console.log(tests)
  res.render('dashboard', { tests })
}

module.exports.postTest = (req, res) => {

}

module.exports.getNewTest = (req, res) => {
  res.render('new')
}