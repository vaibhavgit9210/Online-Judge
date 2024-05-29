const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  result: { type: String, required: true },
  executionTime: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
