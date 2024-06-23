import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [consoleInput, setConsoleInput] = useState('');

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/problems/${id}`);
        setProblem(result.data);
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };

    fetchProblem();
  }, [id]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleRunCode = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/run', {
        code,
        language,
        input: consoleInput.trim() // Pass the correct input
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput(`Error: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  const handleSubmitCode = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/submit', {
        code,
        language,
        problemId: id,
      });
      setOutput(response.data.success ? response.data.message : `Failed at ${response.data.message}`);
    } catch (error) {
      setOutput(`Error: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    // Perform any logout operations like clearing tokens or session
    navigate('/login'); // Redirect to login page after logout
  };

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.problem_detail_container}>
      <div className={styles.header_buttons}>
        <button onClick={handleBack}>Back</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h1>{problem.title}</h1>
      <p>{problem.description}</p>

      <div className={styles.code_editor_container}>
        <div className={styles.editor_controls}>
          <select value={language} onChange={handleLanguageChange}>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button onClick={handleRunCode}>Run</button>
          <button onClick={handleSubmitCode}>Submit</button>
        </div>

        <textarea
          className={styles.code_editor}
          value={code}
          onChange={handleCodeChange}
          placeholder="Write your code here"
        />

        {(language === 'cpp' || language === 'java') && (
          <div className={styles.console_input}>
            <textarea
              placeholder="Console Input"
              value={consoleInput}
              onChange={(e) => setConsoleInput(e.target.value)}
            />
          </div>
        )}

        <pre className={styles.output}>{output}</pre>
      </div>
    </div>
  );
};

export default ProblemDetail;
