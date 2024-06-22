const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
    input: {
        type: [Number],  // Define input as an array of numbers
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
        unique: true  // Ensure each problem number is unique
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    testCases: [testCaseSchema]
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
