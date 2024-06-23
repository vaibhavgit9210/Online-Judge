const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "user_code", "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const javaClassName = path.basename(filepath).split(".")[0]; // Extracting class name
  const javaFilePath = path.join(__dirname, "user_code", "codes", `Main.java`);
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    exec(
      `javac ${javaFilePath} && java -cp ${path.dirname(javaFilePath)} ${javaClassName}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        } else if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      }
    );
  });
};

module.exports = {
  executeJava,
};
