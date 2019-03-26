/*
* This file contains code to for our profile webpage
*/

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
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// PICTURE LOCATIONS!!!
const logoSrc = "../pictures/webPic/logo.png";
const settingIconSrc = "../pictures/webPic/settings.png";
const messgaeSrc = "../pictures/webPic/msg.png";

// TEST DATA!!
const testEvent = new Event("BILL'S PARTY!!!", "Bill's Place", new Date(), "bla bla blas bal bal ba", "w1.jpg", null);
const allCategories = ["cs", "math", "group study", "party", "other"];
const testUser = new User("ian", "../pictures/profilePic/face.jpg", "I need sleep", "2019-03-06", ["CS", "Math","Other"]);

// GLOBAL VARIABLS (for page info below)
let currentSelectedEvent = null;
let currentUser =  testUser;

// event lists
const comingEvents = [];
const pastEvents = [];
const myEvents = [];

getEventList();


/*----------------------------------------------------------------------*/
/*-- Server call functions here --*/
/*----------------------------------------------------------------------*/

// do a pull from server and get events
function getEventList() {
    // idk why im here
    const user = new User("ian", "../pictures/profilePic/face.jpg", "I need sleep", "2019-03-06", ["cs", "math","other"]);

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

    comingEvents.push(model1);
    comingEvents.push(model2);
    comingEvents.push(model3);
    comingEvents.push(model4);

    pastEvents.push(model5);
    pastEvents.push(model6);
    pastEvents.push(model7);

    myEvents.push(model8);
    myEvents.push(model9);
}

// CONNECT WITH BACK-END!!!
function saveUser(newUsr){
    currentUser = newUsr
}

function sendMsg(){
    // For phase 2, this will be sending msg to each user that is following this event.
    console.log(msgBox.querySelector(".msgContent").value);
}

function serverCall(newEvent) {

}

/*----------------------------------------------------------------------*/
/*-- DOM manipulations below. Some functions may involve server calls---*/
/*----------------------------------------------------------------------*/

/*--------------- Bunch of selectors -----------------------*/

// for use in make new event
const make = document.querySelector(".make");

// DOM OBJECTS!!
const eventSection = document.querySelector("#eventSection");
const profileArea = document.querySelector("#profileArea");
const settingIcon = document.querySelector("#settingIcon");
const msgBox = document.querySelector("#msgBox");
const notBox = document.querySelector("#notBox");

/*--------------- Bunch of add-listener calls -----------------------*/

// EVENT LISTENERS!!!
settingIcon.addEventListener("click", settingClicked);
msgBox.addEventListener("click", msgBoxClicked);
notBox.addEventListener("click", notBoxClicked);
document.querySelector("#upComing").addEventListener("click", loadUpComing);
document.querySelector("#pastEvents").addEventListener("click", loadPastEvents);
document.querySelector("#myEvents").addEventListener("click", loadMyEvents);

// Below for make new event
// or edit?????????????????????
make.addEventListener('click', makeNewEvent);

/*----------------------------------------------------------------------*/
/*------------------------- DOM functions ------------------------------*/
/*----------------------------------------------------------------------*/

/*-----------------For page view below------------*/

function addEvent(event) {
    const img = createNewElement("img", "eventImg");
	if(event.img[0] == null) {
		img.src = "w3.jpg"
	}
	else {
		img.src = event.img[0];
	}    
    const darkSheet = createNewElement("div", "darkSheet");

    const title = createNewElement("h1", null, null, event.title);
    
    const location = createNewElement("h3", null, null, event.location);

    const time = createNewElement("h3", null, null, getEventDate(event.date));
    
    const eventInfo = createNewElement("div", "eventInfo");
    eventInfo.append(title, location, time);

    const infoContainer = createNewElement("div", "infoContainer");
    infoContainer.append(img, darkSheet, eventInfo);

    const logo = document.createElement("img");
    logo.src = logoSrc;

    const eventHub = createNewElement("h1", null, null, "Event Hub");

    const eventLogo = createNewElement("div", "eventLogo");
    eventLogo.append(logo, eventHub);
    
    const side = createNewElement("div", "side");
    side.appendChild(eventLogo);

    const eventDiv = createNewElement("div", "event", `eventID${event.id}`)
    eventDiv.append(infoContainer, side);
    eventDiv.addEventListener("click", function (e) {
        currentSelectedEvent = event;
        eventClicked(e);
    })
    eventSection.appendChild(eventDiv);
}

function addUserEvent(event) {
    const img = createNewElement("img", "eventImg");
    img.src = event.img;
    
    const darkSheet = createNewElement("div", "darkSheet");

    const title = createNewElement("h1", null, null, event.title);
    
    const location = createNewElement("h3", null, null, event.location);

    const time = createNewElement("h3", null, null, getEventDate(event.date));
    
    const eventInfo = createNewElement("div", "eventInfo");
    eventInfo.append(title, location, time);

    const infoContainer = createNewElement("div", "infoContainer");
    infoContainer.append(img, darkSheet, eventInfo);

    const logo = document.createElement("img");
    logo.src = logoSrc;

    const eventHub = createNewElement("h1", null, null, "Event Hub");

    const eventLogo = createNewElement("div", "eventLogo");
    eventLogo.append(logo, eventHub);

    const side = createNewElement("div", "side");
    side.appendChild(eventLogo);

    const msg = createNewElement("img", "message");
    msg.src = messgaeSrc;
    msg.addEventListener("click", msgClicked)
    const eventDiv = createNewElement("div", "event", `eventID${event.id}`)
    eventDiv.append(infoContainer, side, msg);
    eventDiv.addEventListener("click", function (e) {
        currentSelectedEvent = event;
        userEventClicked(e);
    })
    eventSection.appendChild(eventDiv);
}

function addEventNotification(event){
    let eventDom = eventSection.querySelector(`#eventID${event.id}`);
    if (eventDom != null && eventDom.querySelector(".notificationIcon") == null){
        let noti = createNewElement("div", "notificationIcon");
        noti.appendChild(createNewElement("span", null, null, "!"));
        eventDom.appendChild(noti);
    }
}
function updateProfileArea(user) {
    profileArea.querySelector("#settingIcon").src = settingIconSrc
    profileArea.querySelector(".profilePic").src = user.pic;
    profileArea.querySelector("#profileInfo h1").textContent = user.usrName;
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

/** Bunch of helper functions for page view dom functions */
// Help get the date format from Date()
function getEventDate(date) {
	return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ` + date.getHours() + ":" 
           + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
}
function openMsgBox() {
    msgBox.style.display = "inline-block";
}

function hideMsgBox() {
    msgBox.style.display = "none";
    msgBox.querySelector(".msgContent").value = "";
}

function openNotificationBox() {
    let notBox = document.querySelector("#notBox");
    notBox.style.display = "inline-block";
}

function hideNotificationBox() {
    notBox.style.display = "none";
}
function clearEvents() {
    while(eventSection.firstChild){
        eventSection.removeChild(eventSection.firstChild);
    }
}

function loadUpComing(){
    clearEvents()
    for (let i = 0; i < comingEvents.length; i++){
        addEvent(comingEvents[i]);
    }
}

function loadPastEvents(){
    clearEvents()
    for (let i = 0; i < pastEvents.length; i++){
        addEvent(pastEvents[i]);
    }
}

function loadMyEvents(){
    clearEvents()
    for (let i = 0; i < myEvents.length; i++){
        addUserEvent(myEvents[i]);
    }
}

/** Below is for make new event section with helpers */
/*--------and with edit????????????----------------------------------*/

// Open the make new event pop up
function makeNewEvent(e) {
	if(e.target.className == "make") {
		e.preventDefault();
		const popUp = new ModPopUp(null, currentUser, domCallback, serverCallback);
		document.body.appendChild(popUp.getPopUp());
	}
}

function domCallback(newEvent) {

}

function serverCallback(newEvent) {
    serverCall(newEvent);
}

/*----------------------------------------------------------------------*/
/*-- This part here is used for event listeners-------------------------*/
/*---Helper functions for event listeners included----------------------*/
/*---Note some may involve server calls-------------------------------- */
/*----------------------------------------------------------------------*/

function eventClicked(e) {
    e.preventDefault();
    console.log(e.target.tagName)

    console.log(e.target.tagName == "SPAN")
    if (e.target.className == "notificationIcon" || e.target.tagName == "SPAN"){
        openNotificationBox();
    }
    else {
        //REMEBER TO CHANGE CURRENTSELLECTEDEVENT BACK TO NULL WHEN YOU AREF FINISHED MICHAEL!!!
        openEventPopUp(currentSelectedEvent); // show event 

    } 
} 

function userEventClicked(e) {
    if (e.target.className != "message"){
          openEditPopUp(currentSelectedEvent); // edit event
    }
}

function openEventPopUp(event) {
    const popUp = new EventPopUp(event, currentUser);
    const body = document.querySelector('body');
    body.appendChild(popUp.getEventPopUp());
}


function openEditPopUp(event) {
    const popup = new ModPopUp(event, currentUser, domCallback, serverCallback);
    document.body.appendChild(popup.getPopUp());
}

function settingClicked(e) {
    e.preventDefault();
    loadUserSetting(currentUser);   
}


function msgClicked(e) {
    e.preventDefault();

    openMsgBox();
}

function msgBoxClicked(e) {
    if (msgBox.style.display != "none"){
        if (e.target == msgBox) {
            e.preventDefault()
            hideMsgBox();
        }
        else if (e.target.className == "submitMsg"){
            e.preventDefault()
            sendMsg();
            hideMsgBox();
        }
    }
}
function notBoxClicked(e) {
    if (notBox.style.display != "none"){
        if (e.target == notBox) {
            e.preventDefault()
            hideNotificationBox();
        }
    }
}

// EVENT HANDLERS FOR Setting!!!!!

function popupClicked(e) {
    if (e.target.id == "popUp"){
        e.preventDefault();
        exitPopup();
    } else if ( e.target.id == "saveButton") {
        e.preventDefault();
        saveProfile(currentUser);
        updateProfileArea(currentUser);
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

// below is used to init the page
function loadPage() {
    loadUpComing();
    addEventNotification(comingEvents[0]);
    updateProfileArea(currentUser);
	makePopUp.style.display = "none";
}
// height: 100%;
//     width: 100%;
//     text-align: center;
//     position: absolute;
// 	top: 0px;
// 	left: 0px;	 
//     overflow: hidden;
//     background-color: rgba(0, 0, 0, 0.5);

loadPage(); 