import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
//import Dashboard from "./components/Dashboard";
import ProblemDetail from "./components/ProblemDetail";


function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			<Route path="/" element={user ? <Main /> : <Navigate to="/login" />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="/problem/:id" element={user ? <ProblemDetail /> : <Navigate to="/login" />} />

		</Routes>
	);
}

export default App;