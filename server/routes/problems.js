const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');

// GET all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find().sort({ problemNumber: 1 });
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET a single problem by id
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create a new problem
router.post('/', async (req, res) => {
  try {
    const { title, description, testCases } = req.body;
    const problemCount = await Problem.countDocuments(); // Get current count of problems
    const problemNumber = problemCount + 1; // Auto-generate problem number
    const newProblem = new Problem({
      problemNumber,
      title,
      description,
      testCases,
    });
    await newProblem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update a problem by id
router.put('/:id', async (req, res) => {
  try {
    const { title, description, testCases } = req.body;
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { title, description, testCases },
      { new: true, runValidators: true }
    );
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a problem by id
router.delete('/:id', async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json({ message: 'Problem deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
