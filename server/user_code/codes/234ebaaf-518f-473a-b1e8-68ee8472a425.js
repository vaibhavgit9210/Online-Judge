// JavaScript program to find the sum of two numbers

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Enter two numbers: ', (input) => {
    const [num1, num2] = input.split(' ').map(Number);
    console.log(`Sum: ${num1 + num2}`);
    readline.close();
});