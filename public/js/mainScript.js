/*
* This file contains code to for our main webpage
*/

/*----------------------------------------------------------------------*/
/*-- Global variables below --*/
/*----------------------------------------------------------------------*/

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const events = [];
const user = getCurrentUser();
getEventList();

/*----------------------------------------------------------------------*/
/*-- Server call functions here --*/
/*----------------------------------------------------------------------*/

// get the info of current user
function getCurrentUser() {
	return new User("ian", "../pictures/profilePic/face.jpg", "I need sleep", "2019-03-06", ["cs", "math","other"]);
}

// do a pull from server and get events
function getEventList() {
	const model1 = new Event("Hackathon", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w2.jpg", "../pictures/eventPic/w1.jpg", "../pictures/eventPic/w4.jpg", "../pictures/eventPic/w5.jpg"], "cs", user.usrName);
	const model2 = new Event("Math event", "Sidney Smith", new Date(), "It's really fun", ["../pictures/eventPic/w1.jpg", "../pictures/eventPic/w4.jpg", "../pictures/eventPic/w5.jpg"], "math", user.usrName);
	const model3 = new Event("Bahen's stuff", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w3.jpg", "../pictures/eventPic/w4.jpg", "../pictures/eventPic/w5.jpg"], "cs", user.usrName);
	const model4 = new Event("CSSU Group Study", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w4.jpg"], "group study", user.usrName);
	const model5 = new Event("Bahen's party", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w1.jpg", "../pictures/eventPic/w4.jpg", "../pictures/eventPic/w5.jpg"], "party", user.usrName);
	const model6 = new Event("I ran out of Idea", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w1.jpg"], "math", user.usrName);
	const model7 = new Event("I ran out of Idea2", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w3.jpg"], "cs", user.usrName);
	const model8 = new Event("I ran out of Idea3", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w4.jpg"], "party", user.usrName);
	const model9 = new Event("I ran out of Idea4", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w2.jpg"], "cs", user.usrName);
	const model10 = new Event("I ran out of Idea2", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w3.jpg"], "other", user.usrName);
	const model11 = new Event("I ran out of Idea3", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w4.jpg"], "party", user.usrName);
	const model12 = new Event("I ran out of Idea4", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w2.jpg"], "other", user.usrName);

	events.push(model1);
	events.push(model2);
	events.push(model3);
	events.push(model4);
	events.push(model5);
	events.push(model6);
	events.push(model7);
	events.push(model8);
	events.push(model9);
	events.push(model10);
	events.push(model11);
	events.push(model12);
}

// add an event to server
function addEventToServer(newEvent) {}

/*----------------------------------------------------------------------*/
/*-- DOM manipulations below. Some functions may involve server calls---*/
/*----------------------------------------------------------------------*/

/*-- all selectors needed---*/
const eventList = document.querySelector(".eventList");
const search = document.querySelector(".search");
const searchContent = document.querySelector("#searchContent");
const mainSection = document.querySelector("#mainSection");
const logIn = document.querySelector(".login");
const signUp = document.querySelector(".signup");
const allEvent = document.querySelector("#all");
const cs = document.querySelector("#cs");
const math = document.querySelector("#math");
const group = document.querySelector("#group");
const party = document.querySelector("#party");
const other = document.querySelector("#other");

// for use in make new event
const make = document.querySelector(".make");

/*--------Add event listeners to each element below----------*/
signUp.addEventListener('click', changeSignUp);
logIn.addEventListener('click', changeLogIn);
search.addEventListener('click', startSearch);
searchContent.addEventListener('keyup', searchForContent);

mainSection.addEventListener('click', dropSearch);
allEvent.addEventListener('click', changeTab);
cs.addEventListener('click', changeTab);
math.addEventListener('click', changeTab);
group.addEventListener('click', changeTab);
party.addEventListener('click', changeTab);
other.addEventListener('click', changeTab);

make.addEventListener('click', makeNewEvent);

// Load the display for testing.
function loadDisplay() {
	for(let i = 0; i < numOfEvents; i++) {
		addEvent(events[i]);
	}
}

/*----------------------------------------------------------------------*/
/*------------------------- DOM functions ------------------------------*/
/*----------------------------------------------------------------------*/

// Help remove all event from the screen.
function removeEventFromScreen() {
	while (eventList.firstChild) {
		eventList.removeChild(eventList.firstChild);
	}
}

// Change the border color of empty input to red to indicate error.
function changeColorError(selector) {
	if(selector.value == "") {
		selector.style.borderColor = "red";
	}
	else {
		selector.style.borderColor = "";
	}
}

/*--------------- add new event to the page ---------------*/

// Create and add new event to the eventList div
function addEvent(event) {
	const eventObj = createNewElement('div', 'event');
    eventObj.id = event.id;
    const imgHolder = createNewElement('div', 'eventImgHolder');
	const img = createNewElement('img', 'eventPhoto');
	if(event.img[0] == null) {
		img.src = "../pictures/eventPic/w3.jpg"
	}
	else {
		img.src = event.img[0];
	}
	img.alt = "Smiley face";
	const eventInfo = createNewElement('div', 'eventInfo');
	eventInfo.style.float = 'left';
	const calendarContainer = createNewElement('div', 'calendarContainer');
	calendarContainer.style.float = 'left';
	const info = createNewElement('div', 'info');
	info.style.float = 'right';
	const calendar = createNewElement('div', 'calendar');
	const month = createNewElement('p', 'month', null, monthNames[event.date.getMonth()]);
	const date = createNewElement('p', 'date', null, event.date.getDate());
	calendar.appendChild(month);
	calendar.appendChild(date);
	calendarContainer.appendChild(calendar);
	const title = createNewElement('p', 'title', null, event.title);
	const dateInfo = createNewElement('p', 'dateInfo', null, getDate(event.date));
	const location = createNewElement('p', 'location', null, event.location);
	info.appendChild(title);
	info.appendChild(location);
	info.appendChild(dateInfo);
	eventInfo.appendChild(calendarContainer);
    eventInfo.appendChild(info);
    eventObj.appendChild(imgHolder);
	imgHolder.appendChild(img);
	eventObj.appendChild(eventInfo);
	eventObj.addEventListener('click', openPopUp);
	eventList.appendChild(eventObj);
}
	
/*----------------------------------------------------------------------*/
/*-- This part here is used for event listeners-------------------------*/
/*-- Some involving create new elements using the DOM functions above---*/
/*----------------------------------------------------------------------*/
	
/*----------------------------------------------------------------------*/
/*-- Search bar section --*/
/*----------------------------------------------------------------------*/

// Expand the search bar on click.
function startSearch(e) {
	if (e.target.className == "search" || e.target.id == "searchIcon" || e.target.id == "searchContent") {
		e.preventDefault();
		search.style.right = "-55px";
	}
}

// Collapse the search on click.
function dropSearch(e) {
	if(!(e.target.className == "search" || e.target.id == "searchIcon" || e.target.id == "searchContent")) {
		e.preventDefault();
		search.style.right = "-255px";
	}
}

// Display search event base on key type.
function searchForContent(e) {
	let filter = searchContent.value.toUpperCase();
	const displayEvents = document.getElementsByClassName("event");
	let len = displayEvents.length;
	for (let i = 0; i < len; i++) {
		const title = displayEvents[i].children[1].children[1].children[0].innerText;
		const loc = displayEvents[i].children[1].children[1].children[1].innerText;
		if(title.toUpperCase().indexOf(filter) > -1 || loc.toUpperCase().indexOf(filter) > -1) {
			e.preventDefault();
			displayEvents[i].style.display = "";
		}
		else {
			e.preventDefault();
			displayEvents[i].style.display = "none";
		}
	}
}

/*----------------------------------------------------------------------*/
/*-- Naviation bar section section --*/
/*----------------------------------------------------------------------*/

function changeLogIn(e) {
	if(e.target.innerText == "Log out") {
		e.preventDefault();
		e.target.innerText = "Log in";
		const signup = document.querySelector(".signup");
		signup.innerText = "Sign up";
	}
	else if (e.target.innerText == "Log in") {
		e.preventDefault();
		window.location.href = "/html/signIn.html";
	}
}

function changeSignUp(e) {
	if(e.target.innerText == "My profile") {
		e.preventDefault();
		window.location.href = "/html/profile.html";
	}
	else {
		e.preventDefault();
		window.location.href = "/html/signUp.html";
	}
}

function changeTab(e) {
	removeEventFromScreen();
	searchContent.value = "";
	if(e.target.id == "all") {
		e.preventDefault();
		for(let i = 0; i < numOfEvents; i++) {
			addEvent(events[i]);
		}
	}
	else if(e.target.id == "cs") {
		e.preventDefault();
		for(let i = 0; i < numOfEvents; i++) {
			if(events[i].type == "cs") {
				addEvent(events[i]);
			}
		}
	}
	else if(e.target.id == "math") {
		e.preventDefault();
		for(let i = 0; i < numOfEvents; i++) {
			console.log(events[i]);
			if(events[i].type == "math") {
				addEvent(events[i]);
			}
		}
	}
	else if(e.target.id == "group") {
		e.preventDefault();
		for(let i = 0; i < numOfEvents; i++) {
			if(events[i].type == "group study") {
				addEvent(events[i]);
			}
		}
	}
	else if(e.target.id == "party") {
		e.preventDefault();
		for(let i = 0; i < numOfEvents; i++) {
			if(events[i].type == "party") {
				addEvent(events[i]);
			}
		}
	}
	else if(e.target.id == "other") {
		e.preventDefault();
		for(let i = 0; i < numOfEvents; i++) {
			if(events[i].type == "other") {
				addEvent(events[i]);
			}
		}
	}
}

// Open the specific event pop up to view the detail.
function openPopUp(e) {
	for(let i = 0; i < e.path.length; i++) {
		if(e.path[i].className == "event") {
			e.preventDefault();
            const eventToPop = getEvent(e.path[i].id);
			const popUp = new EventPopUp(eventToPop, user);
			const mainBody = document.querySelector('body');
			search.style.display = "none";
			mainBody.appendChild(popUp.getEventPopUp());
			break;
		}
	}
}

/*----------------------------------------------------------------------*/
/*-- Make new event section --*/
/*----------------------------------------------------------------------*/

// Open the make new event pop up
function makeNewEvent(e) {
	if(e.target.className == "make") {
		e.preventDefault();
		const popUp = new ModPopUp(null, user, domCallback, serverCallback);
		document.body.appendChild(popUp.getPopUp());
	}
}

function domCallback(newEvent) {
	addEvent(newEvent);
	events.push(newEvent);
}

function serverCallback(newEvent) {
	addEventToServer(newEvent);
}

// Create new event after error checking.
function createNewEvent(e) {
	if(e.target.id == "eventSubmit") {
		e.preventDefault();
		const categ = selectCat.options[selectCat.selectedIndex].value;
		const imgList = [];
		const len = imgContainer.querySelectorAll(".imgInputButton").length;
		for (let i = 0; i < len - 1; i++) {
			imgList.push(imgContainer.querySelectorAll(".imgInputButton")[i].style.backgroundImage.slice(4, -1).replace(/"/g, "")); // == "url("src.png")
		}
		if(date.value != "" && title.value != "" && loc.value != "") {
			const newEvent = new Event(title.value, loc.value, convertTime(date.value), description.value, imgList, categ, user.usrName);
			addEvent(newEvent);
			events.push(newEvent);
			removeMakeNewEVentContent();
		}
		else { 
			changeColorError(title);
			changeColorError(loc);
			changeColorError(date);
			changeColorError(description);
		}
	}
}

// Close the make new event pop up and reset all input fields.
function cancelCreateNewEvent(e) {
	if(e.target.id == "eventCancel") {
		e.preventDefault();
		makePopUp.style.display = "none";
		search.style.display = "";
		removeMakeNewEVentContent();
	}
}

function updateEventPhoto(e) {
	let filepath = e.target.files[0];
	if (filepath != null){
		filepath = filepath.name;
		let oldImg = e.target.parentElement.style.backgroundImage;
		console.log(oldImg);
		e.target.parentElement.style.backgroundImage = "url(" + filepath + ")";
		if (oldImg == "")
			document.querySelector("#imageList").appendChild(newImgInput());
	}
}

// helper to create new element
function createNewElement(type, clss, id, txt) {
    const container = document.createElement(type);
    if ( (typeof clss !== "undefined") && clss != null ){
        container.className = clss;
    }
    if ( (typeof txt !== "undefined") && txt != null ){
        container.appendChild(document.createTextNode(txt));
    }
    if ((typeof id !== "undefined") && id != null) {
        container.id = id;
    }
    return container;
}

// Help get the date format from Date()
function getDate(date) {
	return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ` + date.getHours() + ":" 
           + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
}

// get the event
function getEvent(id) {
    for(let i = 0; i < numOfEvents; i++) {
		if(events[i].id == id) {
			return events[i];
		}
	}
    return null;
}

// init the webpage
loadDisplay();