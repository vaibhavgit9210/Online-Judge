const express = require('express');
const { generateFile } = require('../generateFile');
const { generateInputFile } = require('../generateInputFile');
const { executeCpp } = require('../executeCpp');
const { executePython } = require('../executePython');
const { executeJava } = require('../executeJava');
const { executeJavascript } = require('../executeJavascript');
const Problem = require('../models/problem');

const router = express.Router();

const executeFile = async (language, filePath, inputPath) => {
  switch (language) {
    case 'cpp':
      return await executeCpp(filePath, inputPath);
    case 'python':
      return await executePython(filePath, inputPath);
    case 'java':
      return await executeJava(filePath, inputPath);
    case 'javascript':
      return await executeJavascript(filePath, inputPath);
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};

router.post('/', async (req, res) => {
  const { language = 'cpp', code, input } = req.body;
  if (!code) {
    return res.status(404).json({ success: false, error: 'Empty code!' });
  }
  try {
    const filePath = await generateFile(language, code);
    const inputPath = input ? await generateInputFile(input) : null;
    const output = await executeFile(language, filePath, inputPath);
    res.json({ filePath, inputPath, output });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post('/submit', async (req, res) => {
  const { language = 'cpp', code, problemId } = req.body;
  if (!code) {
    return res.status(404).json({ success: false, error: 'Empty code!' });
  }
  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ success: false, error: 'Problem not found!' });
    }

    const filePath = await generateFile(language, code);
    const submissionResults = [];

    for (let i = 0; i < problem.testCases.length; i++) {
      const testCase = problem.testCases[i];
      const inputPath = await generateInputFile(testCase.input.join('\n'));
      const output = await executeFile(language, filePath, inputPath);

      console.log(`Test case ${i + 1} - Expected: ${testCase.output}, Got: ${output.trim()}`);

      const testCaseResult = {
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: output.trim(),
        passed: output.trim() === testCase.output.toString()
      };

      submissionResults.push(testCaseResult);

      if (!testCaseResult.passed) {
        return res.json({ success: false, message: `Test case ${i + 1} failed.`, testResults: submissionResults });
      }
    }

    // Save submission details to the problem document
    problem.submissions.push({ code, passed: true, testResults: submissionResults });
    await problem.save();

    res.json({ success: true, message: 'All test cases passed!', testResults: submissionResults });
  } catch (error) {
    console.error('Error during submission:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
