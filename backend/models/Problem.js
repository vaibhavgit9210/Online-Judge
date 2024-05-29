const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  testCases: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
    }
  ],
  language: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);
