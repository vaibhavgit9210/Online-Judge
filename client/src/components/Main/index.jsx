import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const url = "http://localhost:8080/api/problems"; // Adjust URL as per your backend route
        const { data } = await axios.get(url);
        setProblems(data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Dashboard</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.problem_list}>
        <h2>List of Problems</h2>
        <ul>
          {problems.map((problem) => (
            <li key={problem._id}>
              <Link to={`/problem/${problem._id}`}>
                Problem {problem.problemNumber}: {problem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
