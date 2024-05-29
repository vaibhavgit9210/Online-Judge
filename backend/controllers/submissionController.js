const Submission = require('../models/Submission');

exports.createSubmission = async (req, res) => {
  const { problemId, userId, code, language, result, executionTime } = req.body;
  try {
    const newSubmission = new Submission({
      problemId, userId, code, language, result, executionTime
    });
    await newSubmission.save();
    res.json(newSubmission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().populate('userId', 'username').populate('problemId', 'title');
    res.json(submissions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
