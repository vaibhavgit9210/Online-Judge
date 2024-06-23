const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, 'user_code', 'codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (language, code) => {
    const jobID = uuid();
    let extension = '';
    let filename = '';
    
    switch (language) {
        case 'cpp':
            extension = 'cpp';
            filename = `${jobID}.${extension}`;
            break;
        case 'python':
            extension = 'py';
            filename = `${jobID}.${extension}`;
            break;
        case 'java':
            // Extract class name from code (assuming code has a standard format)
            const classNameMatch = code.match(/class\s+(\w+)/);
            const className = classNameMatch ? classNameMatch[1] : 'Main'; // Default to Main if no match found
            extension = 'java';
            filename = `${className}.${extension}`;
            break;
        case 'javascript':
            extension = 'js';
            filename = `${jobID}.${extension}`;
            break;
        default:
            throw new Error(`Unsupported language: ${language}`);
    }
    
    const filePath = path.join(dirCodes, filename);
    await fs.writeFileSync(filePath, code);
    return filePath;
};

module.exports = {
    generateFile,
};
