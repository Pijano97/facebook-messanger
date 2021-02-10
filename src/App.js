import "./App.css";
import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState("");

	const [details, setDetails] = useState(null);

	const getUserGeolocationDetails = () => {
		fetch(
			"https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3"
		)
			.then((response) => response.json())
			.then((data) => setDetails(data));
	};

	useEffect(() => {
		getUserGeolocationDetails();
		// run when the app components load
		db.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
				);
			});
	}, []);

	useEffect(() => {
		setUsername(prompt("Please Enter Your Name"));
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();

		db.collection("messages").add({
			message: input,
			username: username,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			country_name: details.country_name,
			location_city: details.city,
			ip: details.IPv4,
		});
		setInput("");
	};

	return (
		<div className="App">
			<img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
			<h1>Dimitrije Gadzic 🚀</h1>
			<h2>Welcome {username}</h2>
			<form className="app__form">
				<FormControl className="app__formControl">
					<Input
						className="app__input"
						placeholder="Enter a message..."
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
					<IconButton
						className="app__iconButton"
						disabled={!input}
						variant="contained"
						color="primary"
						type="submit"
						onClick={sendMessage}
					>
						<SendIcon />
					</IconButton>
				</FormControl>
			</form>

			{/* messages themselves */}

			<FlipMove>
				{messages.map(({ id, message }) => (
					<Message key={id} username={username} message={message} />
				))}
			</FlipMove>
		</div>
	);
}

export default App;
