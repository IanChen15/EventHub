/*
* This file contains code to for our admin profile webpage
*/

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

/*----------------------------------------------------------------------*/
/*-- Global variables below --*/
/*----------------------------------------------------------------------*/

// COLORS!!
const darkGreen = "rgb(43, 122, 120)";
const lightGreen = "rgb(58, 175, 169)";

// DEFAULT ARRAYSS!!
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// PICTURE LOCATIONS!!!
const logoSrc = "../pictures/webPic/logo.png";
const settingIconSrc = "../pictures/webPic/settings.png";
const messgaeSrc = "../pictures/webPic/msg.png";
const deleteIconSrc = "../pictures/webPic/delete.png";

// TEST DATA!!
const testEvent = new Event("BILL'S PARTY!!!", "Bill's Place", new Date(), "bla bla blas bal bal ba", "w1.jpg", null);
const allCategories = ["cs", "math", "group study", "party", "other"];
const testUser = new User("ian", "../pictures/profilePic/face.jpg", "I need sleep", "2019-03-06", ["CS", "Math","Other"]);

// below used for this webpage
let currentUser =  testUser;
let currentSelectedEvent = null;
let currentSelectedUser = null;
let currentMsgEvnet = null;
const allEvents = [];
const allUsers = [];


/*----------------------------------------------------------------------*/
/*-- Server call functions here --*/
/*----------------------------------------------------------------------*/

function loadEventData(){
    // This function will comunicate will get information from server
    const model1 = new Event("Hackathon Hackathon Hackathon Hackathon", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w2.jpg"], "cs");
    const model2 = new Event("Math event", "Sidney Smith", new Date(), "It's really fun", ["../pictures/eventPic/w1.jpg"], "math");
    const model3 = new Event("Bahen's stuff", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w3.jpg"], "cs");
    const model4 = new Event("CSSU Group Study", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w4.jpg"], "group study");
    const model5 = new Event("Bahen's party", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w1.jpg"], "party");
    const model6 = new Event("I ran out of Idea", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w2.jpg"], "math");
    const model7 = new Event("I ran out of Idea2", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w3.jpg"], "cs");
    const model8 = new Event("I ran out of Idea3", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w4.jpg"], "party");
    const model9 = new Event("I ran out of Idea4", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w2.jpg"], "cs");
    
    allEvents.push(model1);
    allEvents.push(model2);
    allEvents.push(model3);
    allEvents.push(model4);
    allEvents.push(model5);
    allEvents.push(model6);
    allEvents.push(model7);
    allEvents.push(model8);
    allEvents.push(model9);
}

function loadUserData() {
    allUsers.push(testUser);
    allUsers.push(new User("BILL", "../pictures/profilePic/face.jpg", "I need sleep", "2019-03-06", ["CS", "Math","Other"]));
    allUsers.push(new User("ian2", "../pictures/profilePic/face.jpg", "I need sleep", "2019-03-06", ["CS", "Math","Other"]));
    allUsers.push(new User("ian3", "../pictures/profilePic/face.jpg", "I need sleep", "2019-03-06", ["CS", "Math","Other"]));
    allUsers.push(new User("ian4", "../pictures/profilePic/face.jpg", "I need sleep", "2019-03-06", ["CS", "Math","Other"]));
}

// CONNECT WITH BACK-END!!!
function saveUser(newUsr){ 
    let index = allUsers.indexOf(currentSelectedUser);
    if (currentUser === currentSelectedUser){
        currentUser = newUsr;
    }
    if (index != null){
        allUsers[index] = newUsr;
    }
}

function sendMsg(){
    // For phase 2, this will be sending msg to each user that is following this event.
    console.log(msgBox.querySelector(".msgContent").value);
}

function delEvent(event){
    // will connect with server and delete event there
    
    allEvents.remove(event);
}

function delUser(user){
    allUsers.remove(user);
}

/*----------------------------------------------------------------------*/
/*-- DOM manipulations below. Some functions may involve server calls---*/
/*----------------------------------------------------------------------*/

// DOM OBJECTS!!
const profileArea = document.querySelector("#profileArea");
const settingIcon = document.querySelector("#settingIcon");
const msgBox = document.querySelector("#msgBox");
const delBox = document.querySelector("#delBox");
const userListWrapper = document.querySelector("#userListWrapper");
const eventListWrapper = document.querySelector("#eventListWrapper");

// for use in make new event
const make = document.querySelector(".make");
const makePopUp = document.querySelector("#makePopUp");
const eventSubmit = document.querySelector("#eventSubmit");
const eventCancel = document.querySelector("#eventCancel");
const selectCat = document.getElementById("categoryInput");
const title = document.getElementById("titleInput");
const date = document.getElementById("dateInput");
const loc = document.getElementById("locationInput");
const imgContainer =  document.querySelector("#imageList");
const description = document.getElementById("descriptionInput");
const commentOrNot = document.getElementById("allowComment");

// EVENT LISTENERS!!!
settingIcon.addEventListener("click", settingClicked);
msgBox.addEventListener("click", msgBoxClicked);
delBox.addEventListener("click", delBoxClicked);
document.querySelector("#modifyUsers").addEventListener("click", loadUsers);
document.querySelector("#modifyEvents").addEventListener("click", loadEvents);

// for use in make new event
make.addEventListener('click', makeNewEvent);
eventSubmit.addEventListener('click', createNewEvent);
eventCancel.addEventListener('click', cancelCreateNewEvent);

document.querySelector(".imgInput").addEventListener("change", updateEventPhoto);


/*----------------------------------------------------------------------*/
/*------------------------- DOM functions ------------------------------*/
/*----------------------------------------------------------------------*/

// DOM MANIPULATION
function updateProfileArea(user) {
    profileArea.querySelector("#settingIcon").src = settingIconSrc
    profileArea.querySelector(".profilePic").src = user.pic;
    profileArea.querySelector("#profileInfo h1").textContent = user.userName;
    profileArea.querySelector(".description").textContent = user.description;
    profileArea.querySelector(".birthday").textContent = user.bday;
    profileArea.querySelector(".interests").textContent = function (){
        let s = "";
        for(let i = 0; i < user.interests.length; i++){
            s += `#${user.interests[i]} `;
        }
        return s;
    }();
}
function loadUserSetting(user) {
    const profilePic = createNewElement("img", null, "profilePicSetting");
    profilePic.src = user.pic;

    const choosePhoto = createNewElement("input", null, "choosePhoto");
    choosePhoto.type = "file";
    choosePhoto.accept = "image/*";
    choosePhoto.addEventListener("change", updatePhoto);

    const editPhoto = createNewElement("div", null, "editPhoto");
    editPhoto.append(profilePic, choosePhoto);

    const userName = createNewElement("h2", null, null, "Username");
    
    const userNameInput = createNewElement("input", null, "userNameInput");
    userNameInput.type = "text";
    userNameInput.value = user.usrName;

    const bday = createNewElement("h2", null, null, "Birthday");
    
    const birthdayInput = createNewElement("input", null, "birthdayInput");
    birthdayInput.type = "date";
    birthdayInput.value = user.bday;
    
    const descr = createNewElement("h2", null, null, "Description");
    
    const descriptionInput = createNewElement("textarea", null, "userDescriptionInput");
    descriptionInput.value = user.description;

    const interests = createNewElement("h2", null, null, "Interests");
    
    const interestList = createNewElement("div", null, "interestList");

    for(let i = 0; i < allCategories.length; i++){
        let cat = allCategories[i];
        let interest = createNewElement("div", "interestSelection", `catID${cat}`, cat);
        if (user.interests.includes(cat)){
            interest.style.backgroundColor = darkGreen;
        }

        interestList.appendChild(interest);

    }

    const interestContainer = createNewElement("div", null, "interestContainer");
    interestContainer.append(interests, interestList);

    const editProfile = createNewElement("div", null, "editProfile");
    editProfile.append(userName, userNameInput, bday, birthdayInput, descr, descriptionInput, interestContainer);

    const saveButton = createNewElement("input", null, "saveButton");
    saveButton.type = "submit";
    saveButton.value = "Save";

    const profileForm = createNewElement("form", null, "profileForm");
    profileForm.append(editPhoto, editProfile, saveButton);

    const settingArea = createNewElement("div", "settingsArea");
    settingArea.appendChild(profileForm);
    const popup =  createNewElement("div", null, "popUp");
    popup.appendChild(settingArea);
    popup.addEventListener("click", popupClicked);

    document.querySelector("body").appendChild(popup);
}

function getEventDate(date) {
    return `${dayName[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getHours()}:${date.getMinutes()}`;
}

function openMsgBox() {
    msgBox.style.display = "inline-block";
}

function hideMsgBox() {
    currentMsgEvnet = null;
    msgBox.style.display = "none";
    msgBox.querySelector(".msgContent").value = "";
}

function openDelBox() {
    s = currentSelectedEvent == null ? "user" : "event";
    delBox.querySelector("h2").textContent = " Are you sure you want to delete this " + s;
    delBox.style.display = "inline-block";
}

function hideDelBox() {
    currentSelectedEvent = null;
    currentSelectedUser = null;
    delBox.style.display = "none";
}

function loadEvents(){
    while(eventListWrapper.firstChild){
        eventListWrapper.removeChild(eventListWrapper.firstChild);
    }
    for (let i = 0; i < allEvents.length; i++){
        eventListWrapper.appendChild(createEventDom(allEvents[i]));
    }
    userListWrapper.style.display = "none";
    eventListWrapper.style.display = "inline-block";
}
function createEventDom(event){
    const title = createNewElement("span", "title", null, event.title);
    const location = createNewElement("span", "location", null, event.location);
    const date = createNewElement("span", "date", null, getEventDate(event.date));
    const msgIcon = createNewElement("img", "msg");
    msgIcon.src = messgaeSrc;

    const del = createNewElement("img", "delete");
    del.src = deleteIconSrc;
  
    const eventDiv = createNewElement("div", "event", `eventID${event.id}`);
    eventDiv.addEventListener("click", function (e){
        currentSelectedEvent = event;
        eventClicked(e);
    })
    eventDiv.append(title, location, date, msgIcon, del);
    return eventDiv;
}

function loadUsers() {
    while(userListWrapper.firstChild){
        userListWrapper.removeChild(userListWrapper.firstChild);
    }
    for (let i = 0; i < allUsers.length; i++){
        userListWrapper.appendChild(createUserDom(allUsers[i]));
    }
    eventListWrapper.style.display = "none";
    userListWrapper.style.display = "inline-block";

}

function createUserDom(user){
    const name = createNewElement("span", "name", null, user.usrName);
    const bday = createNewElement("span", "bday", null, user.bday);
    const del = createNewElement("img", "delete");
    del.src = deleteIconSrc;
    
    const userDiv = createNewElement("div", "user", `userName${user.usrName}`);
    userDiv.append(name, bday, del);
    userDiv.addEventListener("click", function (e){
        currentSelectedUser = user;
        userClicked(e);
    })
    return userDiv;
}

/* For setting tab -------------------------------------*/
function saveProfile(user) {
    let usrname = document.querySelector("#userNameInput").value.trim()
    let pic = document.querySelector("#profilePicSetting").src; 
    let bday = document.querySelector("#birthdayInput").value;
    let des = document.querySelector("#userDescriptionInput").value.trim();
    let interests = new Array();
    
    for(let i = 0; i < allCategories.length; i++){
        let cat = allCategories[i];
        let domCat = document.querySelector(`#catID${cat}`);
        if (domCat != null && domCat.style.backgroundColor == darkGreen){
            interests.push(cat);
        }
    }
    let newUser = new User(usrname, pic, des, bday, interests);
    saveUser(newUser);
}

function selectInterest(interest) {
    if (interest.style.backgroundColor == darkGreen){
        interest.style.backgroundColor = lightGreen;
    } else {
        interest.style.backgroundColor = darkGreen;
    }
} 

function exitPopup() {
    let div = document.querySelector("#popUp");
    if (div != null) {
        div.remove();
    }
}

/*-- Edit event section --*/

function openEditPopUp(event) {
    selectCat.selectedIndex = allCategories.indexOf(event.type)
    title.value = event.title;
    loc.value = event.location;
    const date1 = event.date;
    const dateString = `${date1.getFullYear()}` + "-" 
                     + (date1.getMonth() + 1 < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-"
                     + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate()) + 'T'
                     + (date1.getHours() < 10 ? "0" + date1.getHours() : date1.getHours()) + ":"
                     + (date1.getMinutes() < 10 ? "0" + date1.getMinutes() : date1.getMinutes());
    date.value = dateString;
    console.log(dateString);
    description.value = event.description;

    const imgList = document.querySelector('#imageList');
    imgList.removeChild(imgList.firstElementChild);
    for (let i = 0 ; i < event.img.length ; i++) {
        const img = newImgInput();
        img.firstChild.style.backgroundImage = "url(" + event.img[i] + ")";
        imgList.appendChild(img);
    }
    imgList.appendChild(newImgInput());

    makePopUp.style.display = "";
    eventSubmit.value = "Save";
}

/*----------------------------------------------------------------------*/
/*-- This part here is used for event listeners-------------------------*/
/*----------------------------------------------------------------------*/

function eventClicked(e) {
    e.preventDefault();
    if (e.target.className == "msg"){
        openMsgBox();
    } else if (e.target.className == "delete"){
        openDelBox();
    } else{
        openEditPopUp(currentSelectedEvent);
    }
}
function settingClicked(e) {
    e.preventDefault();
    loadUserSetting(currentUser); 
    currentSelectedUser = currentUser;  
}

function userClicked(e) {
    e.preventDefault();
    if (e.target.className == "delete"){
        openDelBox();
    } else {
        loadUserSetting(currentSelectedUser);
    }
}
function msgBoxClicked(e) {
    if (msgBox.style.display != "none"){
        if (e.target == msgBox) {
            hideMsgBox();
        }
        else if (e.target.className == "submitMsg"){
            sendMsg();
            hideMsgBox();
        }
    }
}

function delBoxClicked(e){
    if (delBox.style.display != "none"){
        if (e.target == delBox || e.target.className == "NO") {
            hideDelBox();
        } else if (e.target.className == "YES"){
            if (currentSelectedEvent == null){
                delUser(currentSelectedUser);
                loadUsers();
            } else {
                delEvent(currentSelectedEvent);
                loadEvents();
            }

            hideDelBox();
        } 
    }
};

// EVENT HANDLERS FOR Setting!!!!!

function popupClicked(e) {
    if (e.target.id == "popUp"){
        e.preventDefault();
        currentSelectedUser = null;
        exitPopup();
    } else if ( e.target.id == "saveButton") {
        e.preventDefault();
        saveProfile(currentSelectedUser);

        updateProfileArea(currentUser);
        loadUsers();
        
        currentSelectedUser = null;
        exitPopup();
    } else if (e.target.className == "interestSelection") {
        e.preventDefault();
        selectInterest(e.target);
    }
}




// DOM SAVING
function updatePhoto(e) {
    let filepath = e.target.files[0];
    if (filepath != null){
        filepath = filepath.name;
        document.querySelector("#profilePicSetting").src = filepath;
    }
}

/* ---- for event edit pop up */

// Open the make new event pop up
function makeNewEvent(e) {
	if(e.target.className == "make") {
		e.preventDefault();
		makePopUp.style.display = "";
	}
}

// Create new event after error checking.
// or do edit
function createNewEvent(e) {
	if(e.target.id == "eventSubmit") {
		e.preventDefault();
		const categ = selectCat.options[selectCat.selectedIndex].value;
		const imgList = [];
		const len = imgContainer.querySelectorAll(".imgInputButton").length;
		for (let i = 0; i < len - 1; i++) {
            // hardcode to add img to the event post
            // server code later
			imgList.push(imgContainer.querySelectorAll(".imgInputButton")[i].style.backgroundImage.slice(4, -1).replace(/"/g, "")); // == "url("src.png")
		}
		if(date.value != "" && title.value != "" && loc.value != "") {
			const newEvent = new Event(title.value, loc.value, convertTime(date.value), description.value, imgList, categ, null);
            //edit event by backend
    
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

/*----------------------------------------------------------------------*/
/*-- Helper function --*/
/*----------------------------------------------------------------------*/

function createNewElement(type, clss, id, txt) {
    const container = document.createElement(type);
    if ( (typeof clss !== "undefined") && clss != null ){
        container.className = clss;
    }
    if ( (typeof txt !== "undefined") && txt != null ){
        container.appendChild(document.createTextNode(txt));
    }
    if ( (typeof id !== "undefined") && id != null ){
        container.id = id;
    }
    return container;
}

// Create the new Img Input for uploading photos.
function newImgInput() {
	const imgButton = createNewElement("div", "imgInputButton");
	const imgInput = createNewElement("input", "imgInput");
	imgInput.type = "file";
	imgInput.accept = "image/*";
	imgInput.addEventListener("change", updateEventPhoto);
	imgButton.appendChild(imgInput);
	const li = createNewElement("li");
	li.appendChild(imgButton);
	return li;
}

// Help remove all the input field value from the MakeEventForm
function removeMakeNewEVentContent() {
	makePopUp.style.display = "none";
	title.value = "";
	date.value = "";
	loc.value = "";
	description.value = "";
	title.style.borderColor = "none";
	date.style.borderColor = "none";
	loc.style.borderColor = "none";
    description.style.borderColor = "none";
    eventSubmit.value = "Post Your Event";

	while (imgContainer.firstElementChild){
		imgContainer.removeChild(imgContainer.firstElementChild)
	}
    imgContainer.appendChild(newImgInput());
    currentSelectedEvent = null;    
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

// Convert the dateime-local
function convertTime(date) {
	var string = date.split(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2})$/);	
	return new Date(string[1], string[2], string[3], string[4], string[5]);
}

function loadPage() {
    loadEventData();
    loadUserData();
    loadEvents();
    makePopUp.style.display = "none";
    updateProfileArea(currentUser);
}
// height: 100%;
//     width: 100%;
//     text-align: center;
//     position: absolute;
// 	top: 0px;
// 	left: 0px;	 
//     overflow: hidden;
//     background-color: rgba(0, 0, 0, 0.5);

// start here
loadPage(); 