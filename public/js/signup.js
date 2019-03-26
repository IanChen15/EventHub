//number of users
let numOfUsers = 0;

// Array for users;
const users = [];

// User class
class User {
	constructor(name, psw, email) {
		this.name = name;
		this.psw = psw;
		this.email = email;
	}
}

const log = console.log;
const signUpForm = document.querySelector("#signup");
const logo = document.querySelector(".logoImg");
signUpForm.addEventListener('submit', signUp);
logo.addEventListener('click', goHome);


function goHome(e) {
	if(e.target.className == "logoImg") {
		e.preventDefault();
		window.location.href = "main.html";
	}
}
// Adds a new book to the global book list and calls addBookToLibraryTable()
function signUp(e) {
	e.preventDefault();

	// Add book book to global array
	const username = document.querySelector('#uname');
	const psw = document.querySelector('#psw');
	const psw_repeat = document.querySelector('#psw_repeat');
	const email = document.querySelector('#email');
	let check = true;
	
	if(!username.value.match(/[a-zA-Z0-9]+/)) {
		username.style.borderColor = "red";
		username.value = "";
		username.placeholder = "Please enter Username with no special characters!";
		check = false;
	}
	else {
		username.style.borderColor = "";
		username.placeholder = "Enter Username";
	}
	
	if(psw.value.length < 6) {
		psw.style.borderColor = "red";
		psw.value = "";
		psw.placeholder = "Password cannot be less than 6 characters!";
		check = false;
	}
	else {
		psw.style.borderColor = "";
		psw.placeholder = "Enter Password";
		if(psw.value != psw_repeat.value) {
			psw_repeat.style.borderColor = "red";
			psw_repeat.value = "";
			psw_repeat.placeholder = "Repeated password does not match!";
			check = false;
		}
		else {
			psw_repeat.style.borderColor = "";
			psw_repeat.placeholder = "Repeat Password";
		}
	}
	
	if(!email.value.match(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/)) {
		email.style.borderColor = "red";
		email.value = "";
		email.placeholder = "Email is not in correct format!";
		check = false;
	}
	else {
		email.style.borderColor = "";
		email.placeholder = "Enter Email";
	}
	log(check);
	if(check == true) {
		const user = new User(username.value, psw.value, email.value);
		// Call addBookToLibraryTable properly to add book to the DOM
		log(user);
		users.push(user);
		numOfUsers++;
		localStorage.setItem("userData", JSON.stringify(user));
		window.location.href = "signIn.html";
	}
	// Clear the text field.

}