const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: {
    type: [Number],
    required: true
  },
  output: {
    type: Number,
    required: true
  }
});

const problemSchema = new mongoose.Schema({
  problemNumber: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  testCases: [testCaseSchema], // Array of test cases
  solutionCode: {
    type: String,
    default: ''
  },
  submissions: [{
    code: String,
    passed: Boolean,
    testResults: [{
      input: [Number],
      expectedOutput: Number,
      actualOutput: Number,
      passed: Boolean
    }]
  }]
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
