const Problem = require('../models/Problem');

exports.createProblem = async (req, res) => {
  const { title, description, testCases, language } = req.body;
  try {
    const newProblem = new Problem({ title, description, testCases, language });
    await newProblem.save();
    res.json(newProblem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ msg: 'Problem not found' });
    }
    res.json(problem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};