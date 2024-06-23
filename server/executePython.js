const { exec } = require("child_process");
const path = require("path");

const executePython = (filepath, inputPath) => {
  let command = `python3 ${filepath}`;
  if (inputPath) {
    command += ` < ${inputPath}`;
  }

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

module.exports = {
  executePython,
};
