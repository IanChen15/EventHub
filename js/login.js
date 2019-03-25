// User class
class User {
	constructor(name, psw, email) {
		this.name = name;
		this.psw = psw;
		this.email = email;
	}
}

const admin = new User('admin', 'admin', 'admin@admin.com');
const user = new User('user', 'user','user@user.com');

const log = console.log;
const logInForm = document.querySelector("#login");
const logo = document.querySelector(".logoImg");
logInForm.addEventListener('submit', logIn);
logo.addEventListener('click', goHome);

function goHome(e) {
	if(e.target.className == "logoImg") {
		e.preventDefault();
		window.location.href = "main.html";
	}
}

// login
function logIn(e) {
	e.preventDefault();
	const username = document.querySelector('#uname');
	const psw = document.querySelector('#psw');
	
	if(admin.name == username.value && admin.psw == psw.value) {
		username.style.borderColor = "none";
		username.value = "";
		username.placeholder = "Enter Username";
		psw.style.borderColor = "none";
		psw.value = "";
		psw.placeholder = "Enter Password";
		window.location.href = "adminProfile.html";
	}
	else if(user.name == username.value && user.psw == psw.value) {
		username.style.borderColor = "none";
		username.value = "";
		username.placeholder = "Enter Username";
		psw.style.borderColor = "none";
		psw.value = "";
		psw.placeholder = "Enter Password";
		window.location.href = "profile.html";
	}
	else {
		if(admin.name != username.value && user.name != username.value) {
			username.style.borderColor = "red";
			username.value = "";
			username.placeholder = "Incorrect username!";
		}
		if(admin.psw != psw.value && user.psw != psw.value) {
			psw.style.borderColor = "red";
			psw.value = "";
			psw.placeholder = "Incorrect password!";
		}
	}
}
