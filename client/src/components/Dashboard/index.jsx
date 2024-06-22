import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const Dashboard = () => {
  const [problems, setProblems] = useState([]);

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

  return (
    <div className={styles.dashboard_container}>
      <h1>Problem Dashboard</h1>
      <ul>
        {problems.map((problem) => (
          <li key={problem._id}>
            <h2>{problem.title}</h2>
            <p>{problem.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
