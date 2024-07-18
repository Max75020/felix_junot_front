import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';

function App() {
	const [max, setMax] = useState("");
	useEffect(() => {
		const fetchMax = async () => {
			try {
				const response = await fetch("http://localhost:8741/api/maxes/1");
				const data = await response.json();
				setMax(data);
			} catch (error) {
				console.error("Failed to fetch services:", error);
			}
		};

		fetchMax();
	}, []);
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit OLL <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
