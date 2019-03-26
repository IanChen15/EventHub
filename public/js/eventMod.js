/*
* This file contains code to make a pop up for modifying event
*/

/*
* To make the pop up. If event is null, make a pop up with
* empty fields. Both callbacks accept event objects
*/
function ModPopUp(event, user, domCallBack, serverCallBack) {

    const optionList = [];
    const maxTitle = 40;
    getOptionList();

    this.popUp = makePopUp(event);

    /*----------------------------------------------------------------------*/
    /*------------------------- DOM Manipulation ---------------------------*/
    /*----------------------------------------------------------------------*/

    const submitButton = this.popUp.querySelector('#eventSubmit');
    const cancelButton = this.popUp.querySelector('#eventCancel');

    cancelButton.addEventListener('click', closePopUp.bind(this));
    submitButton.addEventListener('click', createNewEvent.bind(this));

    function getOptionList() {
        optionList.push('cs', 'math', 'group study', 'party', 'other');
    }

    function makePopUp(event) {
        const holder = createNewElement('div', null, 'makePopUp', null);
        const innerHolder = createNewElement('div', 'postHolder');
        const form = createNewElement('form', null, 'postInfoForm', null);
        form.action = "/event";
        form.enctype = "multipart/form-data"
        form.method = "post"; //////////////////////////////////////////////////////////////////////////////////////////////////////////////// SERVER PART!!! SHOULD CHANGE
        // for basic info
        const basicInfo = createNewElement('div', 'block', 'basicInfo', null);
        const basicHeader = createNewElement('div', 'blockHeader', null, 'Basic Info');
        const headerHr = createNewElement('hr', 'headerLine', null, null); // not
        basicHeader.appendChild(headerHr);
        const basicList = createNewElement('ul', 'inputFormList', null, null);
        // for option
        const opLi = createNewElement('li', null, null, null);
        const opLabel = createNewElement('label', null, null , 'Category:');
        opLabel.htmlFor = 'categoryInput';
        const opSelect = createNewElement('select', 'inputBox', 'categoryInput', null);
        opSelect.name = "types";
        opSelect.multiple = true;
        for (let i = 0 ; i < optionList.length ; i++) {
            let op = createNewElement('option', null, null, optionList[i].charAt(0).toUpperCase() + optionList[i].slice(1));
            opSelect.appendChild(op);
        }
        opLi.appendChild(opLabel);
        opLi.appendChild(opSelect);
        // for title input
        const titleLi = createNewElement('li', null, null, null);
        const titleLabel = createNewElement('label', null, null, 'Title:');
        titleLabel.htmlFor = 'titleInput';
        const titleInput = createNewElement('input', 'inputBox', 'titleInput', null);
        titleInput.type = 'text';
        titleInput.name = 'title'
        titleInput.maxlength = maxTitle;
        titleLi.appendChild(titleLabel);
        titleLi.appendChild(titleInput);
        // for date input
        const dateLi = createNewElement('li', null, null, null);
        const dateLabel = createNewElement('label', null, null, 'Date:');
        dateLabel.htmlFor = 'dateInput';
        const dateInput = createNewElement('input', 'inputBox', 'dateInput', null);
        dateInput.type = 'datetime-local';
        dateInput.name = "date";
        dateLi.appendChild(dateLabel);
        dateLi.appendChild(dateInput);
        // for location
        const locationLi = createNewElement('li', null, null, null);
        const locationLabel = createNewElement('label', null, null, 'Location:');
        locationLabel.htmlFor = 'locationInput';
        const locationInput = createNewElement('input', 'inputBox', 'locationInput', null);
        locationInput.type = 'text';
        locationInput.name = 'location';
        locationLi.appendChild(locationLabel);
        locationLi.appendChild(locationInput);
        // combine basic ul
        basicList.appendChild(opLi);
        basicList.appendChild(titleLi);
        basicList.appendChild(dateLi);
        basicList.appendChild(locationLi);
        // put basic info to form
        basicInfo.appendChild(basicHeader);
        basicInfo.appendChild(basicList);
        form.appendChild(basicInfo);

        // for img des info
        const mainInfo = createNewElement('div', 'block', 'desImgInfo', null);
        const mainHeader = createNewElement('div', 'blockHeader', null, 'Main Info');
        const header2Hr = createNewElement('hr', 'headerLine', null, null); // not
        mainHeader.appendChild(header2Hr);
        const mainList = createNewElement('ul', 'inputFormList', null, null);
        // for img list
        const imgLi = createNewElement('li', null, null, null);
        const imgLabel = createNewElement('label', null, null, 'Upload Pictures: ');
        const imgUl = createNewElement('ul', null, 'imageList', null);
        imgLi.appendChild(imgLabel);
        imgLi.appendChild(imgUl);
        // for des list
        const desLi = createNewElement('li', null, null, null);
        const desLabel = createNewElement('label', null, null, 'Description: ');
        desLabel.htmlFor = 'descriptionInput';
        const desInput = createNewElement('textarea', 'inputBox', 'descriptionInput', null);
        const descriptionInput = createNewElement('input', 'descriptionInput');
        descriptionInput.type = "hidden";
        descriptionInput.name = "description"
        desLi.appendChild(desLabel);
        desLi.appendChild(desInput);
        desLi.appendChild(descriptionInput);
        // for allow comment
        const allowLi = createNewElement('li', null, null, null);
        const allowLabel = createNewElement('label', null, null, 'Allow Comments:');
        allowLabel.htmlFor = 'allowComments';
        const allowInput = createNewElement('input', null, 'allowComments', 'Comment');
        allowInput.type = 'checkbox';
        allowInput.name = 'allowComments'
        allowLi.appendChild(allowLabel);
        allowLi.appendChild(allowInput);
        // combine main ul
        mainList.appendChild(imgLi);
        mainList.appendChild(desLi);
        mainList.appendChild(allowLi);
        // put main to form
        mainInfo.appendChild(mainHeader);
        mainInfo.appendChild(mainList);
        form.appendChild(mainInfo);

        // make two buttons
        const cancelButton = createNewElement('input', null, 'eventCancel', null);
        cancelButton.type = 'button';
        cancelButton.value = 'Cancel';
        const submitButton = createNewElement('input', null, 'eventSubmit', null);
        submitButton.type = 'submit';
        submitButton.value = 'Post your Event';
        // put them to form
        form.appendChild(cancelButton);
        form.appendChild(submitButton);

        // finish up
        innerHolder.appendChild(form);
        holder.appendChild(innerHolder);

        if (event != null) {
            opSelect.selectedIndex = optionList.indexOf(event.type);
            titleInput.value = event.title;
            locationInput.value = event.location;
            const date1 = event.date;
            const dateString = `${date1.getFullYear()}` + "-" 
                            + (date1.getMonth() + 1 < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-"
                            + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate()) + 'T'
                            + (date1.getHours() < 10 ? "0" + date1.getHours() : date1.getHours()) + ":"
                            + (date1.getMinutes() < 10 ? "0" + date1.getMinutes() : date1.getMinutes());
            dateInput.value = dateString;
            desInput.value = event.description;

            // for img
            for (let i = 0 ; i < event.img.length ; i++) {
                const img = newImgInput();
                img.firstChild.style.backgroundImage = "url(" + event.img[i] + ")";
                imgUl.appendChild(img);
            }

            submitButton.value = "Save";
        }
        imgUl.appendChild(newImgInput());

        return holder;
    }

    // Create the new Img Input for uploading photos.
    function newImgInput() {
        const imgButton = createNewElement("div", "imgInputButton");
        const imgInput = createNewElement("input", "imgInput");
        imgInput.type = "file";
        imgInput.name = "eventPhotos"
        imgInput.accept = "image/*";
        imgInput.addEventListener("change", updateEventPhoto);
        imgButton.appendChild(imgInput);
        const li = createNewElement("li");
        li.appendChild(imgButton);
        return li;
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
        if (id != null) {
            container.id = id;
        }
        return container;
    }

    /*----------------------------------------------------------------------*/
    /*-- This part here is used for event handlers-------------------------*/
    /*----------------------------------------------------------------------*/

    // update event photo
    function updateEventPhoto(e) {
        let filepath = e.target.files[0];
        if (filepath != null){
            filepath = filepath.name;
            let oldImg = e.target.parentElement.style.backgroundImage;
            console.log(oldImg);
            e.target.parentElement.style.backgroundImage = "url(../pictures/eventPic/" + filepath + ")";
            if (oldImg == "")
                document.querySelector("#imageList").appendChild(newImgInput());
        }
    }

    // Create new event after error checking.
    function createNewEvent(e) {
        if(e.target.id == "eventSubmit") {
            e.preventDefault();
            // selectors
            const selectCat = this.popUp.querySelector('#categoryInput');
            const imgContainer = this.popUp.querySelector('#imageList');
            const date = this.popUp.querySelector('#dateInput');
            const title = this.popUp.querySelector('#titleInput');
            const loc = this.popUp.querySelector('#locationInput');
            const description = this.popUp.querySelector('#descriptionInput');
            const descriptionInput = document.querySelector('.descriptionInput');
            descriptionInput.value = description.value
  
            if(selectCat.selectedOptions.length != 0  && title.value != "" && loc.value != "" && description.value != "") {
                // do work here
                const categ = [];
                for(let i = 0; i < selectCat.selectedOptions.len; i++){
                    categ.push(selectCat.selectedOptions[i].value);
                }
                const imgList = [];
                const len = imgContainer.querySelectorAll(".imgInputButton").length;
                for (let i = 0; i < len - 1; i++) {
                    imgList.push(imgContainer.querySelectorAll(".imgInputButton")[i].style.backgroundImage.slice(4, -1).replace(/"/g, "")); // == "url("src.png")
                }
                const newEvent = new Event(title.value, loc.value, convertTime(date.value), description.value, imgList, categ, user.usrName);
                // do callback and remove itself
                if (domCallBack != null) {
                    domCallBack(newEvent);
                }
                if (serverCallBack != null) {
                    serverCallBack(newEvent);
                }
                document.querySelector("#postInfoForm").submit();
                this.popUp.parentElement.removeChild(this.popUp);
            }
            else { 
                changeColorError(selectCat);
                changeColorError(title);
                changeColorError(loc);
                changeColorError(date);
                changeColorError(description);
            }
        }
    }

    // close self
    function closePopUp(e) {
        e.preventDefault();
        this.popUp.parentElement.removeChild(this.popUp);
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
        const string = date.split(/^(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2})$/);	
        return new Date(string[1], string[2], string[3], string[4], string[5]);
    }
}

ModPopUp.prototype.getPopUp = function () {
    return this.popUp;
}

//const user = new User("ian", "../pictures/profilePic/face.jpg", "I need sleep", "2019-03-06", ["cs", "math","other"]);
//const model12 = new Event("I ran out of Idea4", "Bahen, Center of I.T.", new Date(), "It's really fun", ["../pictures/eventPic/w2.jpg"], "other", user.usrName);
//new ModPopUp(null, user, null, null);