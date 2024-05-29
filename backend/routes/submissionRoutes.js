const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

router.post('/', submissionController.createSubmission);
router.get('/', submissionController.getSubmissions);

module.exports = router;
