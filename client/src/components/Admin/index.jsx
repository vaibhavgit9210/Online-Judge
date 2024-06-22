import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const Admin = () => {
  const [problems, setProblems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    sampleInput: "",
    sampleOutput: "",
    testCases: [{ input: "", output: "" }],
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const result = await axios.get("http://localhost:8080/api/problems", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setProblems(result.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTestCaseChange = (index, e) => {
    const newTestCases = form.testCases.map((testCase, i) => {
      if (i === index) return { ...testCase, [e.target.name]: e.target.value };
      return testCase;
    });
    setForm({ ...form, testCases: newTestCases });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/api/problems", form, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setProblems([...problems, result.data]);
      setForm({ title: "", description: "", sampleInput: "", sampleOutput: "", testCases: [{ input: "", output: "" }] });
    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/problems/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setProblems(problems.filter((problem) => problem._id !== id));
    } catch (error) {
      console.error("Error deleting problem:", error);
    }
  };

  return (
    <div className={styles.admin_container}>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="text" name="sampleInput" placeholder="Sample Input" value={form.sampleInput} onChange={handleChange} required />
        <input type="text" name="sampleOutput" placeholder="Sample Output" value={form.sampleOutput} onChange={handleChange} required />
        {form.testCases.map((testCase, index) => (
          <div key={index}>
            <input type="text" name="input" placeholder="Test Case Input" value={testCase.input} onChange={(e) => handleTestCaseChange(index, e)} required />
            <input type="text" name="output" placeholder="Test Case Output" value={testCase.output} onChange={(e) => handleTestCaseChange(index, e)} required />
          </div>
        ))}
        <button type="submit">Add Problem</button>
      </form>
      <ul>
        {problems.map((problem) => (
          <li key={problem._id}>
            <h2>{problem.title}</h2>
            <button onClick={() => handleDelete(problem._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
