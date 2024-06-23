const express = require('express');
const { generateFile } = require('../generateFile');
const { generateInputFile } = require('../generateInputFile');
const { executeCpp } = require('../executeCpp');
const { executePython } = require('../executePython');
const { executeJava } = require('../executeJava');
const { executeJavascript } = require('../executeJavascript');

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

module.exports = router;
