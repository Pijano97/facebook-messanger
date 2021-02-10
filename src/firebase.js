import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyBnNyARpivL2qOBx286Ay3KDkNUwnWqhGk",
	authDomain: "facebook-messanger-clone-db71f.firebaseapp.com",
	databaseURL: "https://facebook-messanger-clone-db71f.firebaseio.com",
	projectId: "facebook-messanger-clone-db71f",
	storageBucket: "facebook-messanger-clone-db71f.appspot.com",
	messagingSenderId: "355965682061",
	appId: "1:355965682061:web:ddafce79d2232ee3b03dc4",
	measurementId: "G-1RWJSCVFTY",
});

const db = firebaseApp.firestore();

export default db;
