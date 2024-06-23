import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/problems/${id}`, {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setProblem(response.data);
      } catch (error) {
        console.error(`Error fetching problem ${id}:`, error);
      }
    };
    fetchProblem();
  }, [id]);

  return (
    <div>
      {problem ? (
        <>
          <h2>{problem.title}</h2>
          <p>{problem.description}</p>
        </>
      ) : (
        <p>Loading problem...</p>
      )}
    </div>
  );
};

export default ProblemDetail;
