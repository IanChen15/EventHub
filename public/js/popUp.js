/*
* This file contains code to make a pop up. It includes server code, 
* event handlers and add element for the event pop up window. This 
* pop up will add event listeners to remove itself from the parent
* if background is clicked or close button is clicked.
*/

/*
* This function makes the pop up
*/
function EventPopUp(event, user) {
    // used for hardcode part
    const maxReply = 1;
    const maxComment = 1;
    const loadNumber = 1;

    // used for comment id hardcode
    let commentIdCount = 10;

    // global img array for slider
    const imgSlideContent = [];
    let imgSlideIndex = 0;
    // for users in the comment section
    const users = [];
    const currentUser = user;
    const isJoined = getEvent(event);

    // This refer to this pop-up element
    this.popUp = createEventPopUp(event);

    /*----------------------------------------------------------------------*/
    /*-- Server call functions here --*/
    /*----------------------------------------------------------------------*/

    /*
    * Gets event info from the server and return if this event is followed
    * by the login user.
    */
    function getEvent(event) {
        // clear any old comments
        event.comment = [];
        event.commentLoaded = 0;

        const comment1 = new Comment(1, "Mike", "I think this is gud!!", new Date("March 3, 2019 18:00:00"));
        const comment2 = new Comment(2, "Ian", "I think this is gud!!", new Date("March 3, 2019 19:00:00"));
        const subComment3 = new Comment(3, "Mike", "I think this is gud!!", new Date("March 3, 2019 18:30:00"));
        const subComment4 = new Comment(4, "Bill", "I think this is gud!!", new Date("March 3, 2019 21:00:00"));
        const subComment6 = new Comment(6, "Bill", "I think this is gud!!", new Date("March 3, 2019 23:00:00"));
        const comment5 = new Comment(5, "Mike", "I think this is gud!!", new Date("March 3, 2019 22:00:00"));
        comment2.addReply(subComment3);
        comment2.addReply(subComment4);
        comment2.addReply(subComment6);
        event.addComment(comment1);
        event.addComment(comment2);
        event.addComment(comment5);
    
        // push the login user
        users.push(currentUser);
        users.push(new User("Ian", "../pictures/profilePic/face.jpg", "I need sleep", "2019-03-06", ["cs", "math","other"]), new User("Bill", "../pictures/profilePic/face.jpg", "I need sleep", "2019-03-06", "Bahen, Center of I.T.", ["cs", "math","other"]), new User("Mike", "../pictures/profilePic/face.jpg", "I need sleep", "2019-03-06", "Bahen, Center of I.T.", ["cs", "math","other"]));
        
        return false;
    }

    // get comment id from server
    function getCommentId() {
        commentIdCount += 1;
        return commentIdCount;
    }

    // get date from the server
    function getDate() {
        return new Date();
    }

    // add comment to the server
    function addCommentToServer() {}

    /*----------------------------------------------------------------------*/
    /*-- DOM manipulation to make the pop-up --*/
    /*----------------------------------------------------------------------*/

    /*- Some selectors needed -*/
    const replyTags = this.popUp.querySelectorAll('.reply');
    const moreBars = this.popUp.querySelectorAll('.moreBar');
    const leftArrow = this.popUp.querySelector('#leftArrow');
    const rightArrow = this.popUp.querySelector('#rightArrow');
    const commentArea = this.popUp.querySelector('#commentArea');
    const closeButton = this.popUp.querySelector('#close');
    const joinButton = this.popUp.querySelector('#joinButton');

    // More selectors
    const commentSubmit = this.popUp.querySelector('#commentSubmit');
    const inputComment = this.popUp.querySelector('#inputComment');

    /*- create reply form here to use -*/
    const replyForm = document.createElement('form');
    const replyInput = document.createElement('input');
    replyInput.type = 'text';
    replyInput.placeholder = 'Your reply..';
    replyInput.id = 'replyInput';
    const replyButton = document.createElement('input');
    replyButton.type = 'submit';
    replyButton.value = 'Reply';
    replyButton.id = 'replyButton';

    replyForm.appendChild(replyInput);
    replyForm.appendChild(replyButton);

    /*--------Add event listeners to each element below----------*/
    // all reply tags
    for (let i = 0 ; i < replyTags.length ; i++) {
        replyTags[i].addEventListener('click', userReplyClick);
    }

    // all moreBars
    for (let i = 0 ; i < moreBars.length ; i++) {
        moreBars[i].addEventListener('click', moreBarClick);
    }

    leftArrow.addEventListener('click', slideImg);
    rightArrow.addEventListener('click', slideImg);
    closeButton.addEventListener('click', closePopUp.bind(this));
    this.popUp.addEventListener('click', closePopUp.bind(this));
    closeButton.addEventListener('click', closePopUp);
    joinButton.addEventListener('click', joinButtonClick);

    // do more add
    commentSubmit.addEventListener('click', makeComment);
    replyButton.addEventListener('click', makeReply);

    // make the pop up
    function createEventPopUp(event) {
        const popUp = document.createElement('div');
        popUp.id = 'popUpBackground';
    
        const closeX = document.createElement('div');
        closeX.id = 'close';
        closeX.appendChild(document.createTextNode("close"));
    
        const postHolder = document.createElement('div');
        postHolder.id = 'postHolder';
        // top header
        const topHeader = document.createElement('div');
        topHeader.id = 'topHeader';
        // top header inside
        const h1 = document.createElement('h1');
        h1.appendChild(document.createTextNode(event.title));
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(monthNames[event.date.getMonth()] + " " + event.date.getDate()));
        p.appendChild(document.createElement('br'));
        p.appendChild(document.createTextNode(event.location));
        const left = document.createElement('div');
        const lArrow = document.createElement('div'); // not
        left.id = 'leftArrowHolder';
        lArrow.id = 'leftArrow';
        left.appendChild(lArrow);
        const right = document.createElement('div');
        const rArrow = document.createElement('div'); // not
        right.id = 'rightArrowHolder';
        rArrow.id = 'rightArrow';
        right.appendChild(rArrow);
        const imgHolder = document.createElement('div');
        imgHolder.id = 'imgHolder';
        const backImgHolder = document.createElement('div');
        backImgHolder.id = 'backImgHolder';
        const img1 = document.createElement('img');
        const img2 = document.createElement('img');
        img1.classList.add('foreImg');
        img1.classList.add('fade');
        img1.src = event.img[0];
        img2.classList.add('backImg');
        img2.classList.add('fade');
        img2.src = event.img[0];
        imgHolder.appendChild(img1);
        backImgHolder.appendChild(img2);
        imgHolder.appendChild(backImgHolder);
        // push to img array for img slider
        imgSlideContent.push(img2);
        imgSlideContent.push(img1);
        for (let i = 1 ; i < event.img.length ; i++) {
            const img1 = document.createElement('img');
            const img2 = document.createElement('img');
            img1.src = event.img[i];
            img2.src = event.img[i];
            img1.classList.add('hiddenImg');
            img2.classList.add('hiddenImg');
            backImgHolder.appendChild(img2);
            imgHolder.appendChild(img1);
            // same here
            imgSlideContent.push(img2);
            imgSlideContent.push(img1);
            
        }    
        const darkSheet = createNewElement('div', 'darkSheet', null, null);
        const headerInfo = createNewElement('div', null, 'headerInfo', null);
        const anchor = createNewElement('a', null, 'eventOwner', "by " + event.username);
        headerInfo.appendChild(h1);
        headerInfo.appendChild(anchor);
        headerInfo.appendChild(p);
        topHeader.appendChild(imgHolder);
        topHeader.appendChild(darkSheet);
        topHeader.appendChild(left);
        topHeader.appendChild(right);
        topHeader.appendChild(headerInfo);
        // bottom part
        const bottomPart = createNewElement('div', null, 'bottomPart', null);
        // bottom part inside
        const joinButton = document.createElement('div');
        joinButton.id = 'joinButton';
        // need to check if user has already joined
        if (!isJoined) {
            joinButton.appendChild(document.createTextNode("I want to join"));
        }
        else {
            joinButton.appendChild(document.createTextNode("Joined"));
        }
        const des = createNewElement('div', null, 'description', null);
        const h3 = createNewElement('h3', null, null, "Description"); // not
        const bp = createNewElement('p', null, null, event.description); // not
        des.appendChild(h3);
        des.appendChild(bp);
        const cBar = createNewElement('div', null, 'commentBar', null);
        const cForm = createNewElement('form', null, 'commentForm') // not
        const inputC = createNewElement('textarea', null, 'inputComment', null); // not
        inputC.placeholder = "Your comment...";
        inputC.required = true;
        const cSubmit = createNewElement('input', null, 'commentSubmit', null); // not
        cSubmit.value = "Comment";
        cSubmit.type = 'submit';
        cForm.appendChild(inputC);
        cForm.appendChild(cSubmit);
        cBar.appendChild(cForm);
        // comment part below
        const commentArea = createNewElement('div', null, 'commentArea', null);
        event.comment.sort(sortByDate);
        for (let i = 0 ; i < event.comment.length && i < maxComment ; i++) {
            const newComment = createCommentBlock(event.comment[i], false);
            commentArea.appendChild(newComment);
            commentArea.appendChild(createNewElement('hr', 'cmLine', null, null));
            event.commentLoaded += 1;
        }
        if (event.comment.length > maxComment) {
            const barContainer = createMoreBar("More Comment");
            barContainer.id = 'moreComment';
            commentArea.appendChild(barContainer);
        }
        bottomPart.appendChild(joinButton);
        bottomPart.appendChild(des);
        bottomPart.appendChild(cBar);
        bottomPart.appendChild(commentArea);
    
        postHolder.appendChild(topHeader);
        postHolder.appendChild(bottomPart);
    
        popUp.appendChild(closeX);
        popUp.appendChild(postHolder);

        return popUp;
    }

    // helper to create a comment block with subcomments inside
    function createCommentBlock(comment, isSubcomment) {
        const profilePic = getProfilePicture(comment.username);
        const dateString = getTimeString(comment.date);

        const commentBlock = createNewElement('div', 'commentBlock', `${comment.id}`, null);
        const pImg = createNewElement('img', 'profilePic', null, null);
        pImg.src = profilePic;
        // THIS EVENT LISTENER IS HERE ONLY FOR PURPOSE OF PHASE 1. For phase 2 this will be
        // connecting with database to switch user
        pImg.addEventListener("click", function (e) {
            window.location.href = "profileTP.html";
        })
        const name = createNewElement('span', 'userName', null, comment.username);
        const userTag = createNewElement('div', 'userTag', null, null);
        if (isSubcomment == false) {
            const reply = createNewElement('span', 'reply', null, "Reply"); // not
            userTag.appendChild(reply);
        }
        userTag.appendChild(document.createTextNode(dateString));
        const hr = createNewElement('hr', null, null, null);
        const pp = createNewElement('p', null, null, comment.txt);

        // make a basic block here
        if (isSubcomment == false) {
            commentBlock.appendChild(pImg);
        }
        commentBlock.appendChild(name);
        commentBlock.appendChild(userTag);
        commentBlock.appendChild(hr);
        commentBlock.appendChild(pp);
        
        // now for the reply part
        if (comment.reply.length > 0) {
            comment.sortReply(sortByDate);
            for (let i = 0 ; i < comment.reply.length && i < maxReply ; i++) {
                const newReply = createCommentBlock(comment.reply[i], true);
                newReply.classList.add('subCommentBlock');
                commentBlock.appendChild(newReply);
                comment.replyLoaded += 1;
            }
            if (comment.reply.length > maxReply) {
                const barContainer = createNewElement('div', 'centerWrapper', `${comment.id}`, null);
                barContainer.appendChild(createMoreBar("More Reply"));
                commentBlock.appendChild(barContainer);
            }
        }
        
        return commentBlock;
    }

    // helper to create a more reply bar
    function createMoreBar(text) {
        const bar = createNewElement('div', 'moreBar', null, text);
        return bar;
    }

    // insert a new comment block
    function insertNewCommentBlock(comment){
        const commentBlock = createCommentBlock(comment, false);
        const newReply = commentBlock.querySelector('.reply');
        newReply.addEventListener("click", userReplyClick);
        const moreBar = commentBlock.querySelector('.moreBar');
        if (moreBar != null) {
            moreBar.addEventListener('click', moreBarClick);
        }
        commentArea.insertBefore(commentBlock, commentArea.children[0]);
    }

    // insert a new sub comment block
    function insertNewSubCommentBlock(comment, commentBlock){
        const replyBlock = createCommentBlock(comment, true);
        replyBlock.classList.add('subCommentBlock');
        commentBlock.removeChild(replyForm);
        commentBlock.insertBefore(replyBlock, commentBlock.children[5]);
    }

    /*-- Helper functions for DOM stuff here ---------------------*/

    // get the profile picture of user by username
    function getProfilePicture(username) {
        for (let i = 0 ; i < users.length ; i++) {
            if (username === users[i].usrName) {
                return users[i].pic;
            }
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
        if (id != null) {
            container.id = id;
        }
        return container;
    }

    // helper to get the time string
    function getTimeString(date) {
        const dateString = monthNames[date.getMonth()] + " " + date.getDate() + ", " 
                        + date.getHours() + ":" 
                        + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
        return dateString;
    }

    // sort function for comments
    function sortByDate(a, b) {
        return b.date - a.date;
    }

    /*----------------------------------------------------------------------*/
    /*-- This part here is used for event listeners-------------------------*/
    /*-- Some involving create new elements using the DOM functions above---*/
    /*-- All base elements are assumed to be created here ------------------*/
    /*----------------------------------------------------------------------*/

    // close the pop-up
    function closePopUp(e) {
        e.preventDefault();
        if (e.target.id == 'close' || e.target.id == 'popUpBackground') {
            this.popUp.parentElement.removeChild(this.popUp);
        }
    }

    // for join button click
    function joinButtonClick(e) {
        if (e.target.innerText == 'I want to join') {
            e.target.innerText = 'Joined';
        }
        else {
            e.target.innerText = 'I want to join';
        }
    }

    // for reply function
    function userReplyClick(e) {
        e.preventDefault();

        if (replyForm.parentElement != null) {
            replyForm.parentElement.removeChild(replyForm);
        }
        e.target.parentElement.parentElement.insertBefore(replyForm, e.target.parentElement.parentElement.children[5]);
    }

    // for img slider
    function slideImg(e) {
        e.preventDefault();

        // check if there is img to slide
        // minimum 2 img (one fore img one back img)
        if (imgSlideContent.length == 2) {
            return;
        }
        let newIndex = 0;
        if (e.target.id == 'leftArrow') {
            newIndex = imgSlideIndex - 2 < 0 ? imgSlideContent.length - 2 : imgSlideIndex - 2;
        }
        else {
            newIndex = imgSlideIndex + 2 == imgSlideContent.length ? 0 : imgSlideIndex + 2;
        }
        // set class to new img and remove class from old img
        imgSlideContent[imgSlideIndex].classList.remove("backImg");
        imgSlideContent[imgSlideIndex+1].classList.remove("foreImg");
        imgSlideContent[imgSlideIndex].classList.remove("fade");
        imgSlideContent[imgSlideIndex+1].classList.remove("fade");
        imgSlideContent[imgSlideIndex].classList.add("hiddenImg");
        imgSlideContent[imgSlideIndex+1].classList.add("hiddenImg");

        imgSlideContent[newIndex].classList.add("backImg");
        imgSlideContent[newIndex+1].classList.add("foreImg");
        imgSlideContent[newIndex].classList.remove("hiddenImg");
        imgSlideContent[newIndex+1].classList.remove("hiddenImg");
        imgSlideContent[newIndex].classList.add("fade");
        imgSlideContent[newIndex+1].classList.add("fade");

        imgSlideIndex = newIndex;
    }

    // helper to get the correct comment by id 
    function getCommentById(id) {
        for (let i = 0 ; i < event.comment.length ; i++) {
            if (id == event.comment[i].id) {
                return event.comment[i];
            }
        }
    }

   
    /*-- Event listeners that do server calls and modify global data structure --*/

    // comment function
    function makeComment(e) {
        e.preventDefault();

        const text = inputComment.value;
        inputComment.value = null;
        // the line below could be changed when doing server part
        if (text.trim() != "") {
            const newComment = new Comment(getCommentId(), currentUser.usrName, text, getDate());
            // add new comment to the database
            addCommentToServer();
            event.addComment(newComment);
            event.sortComment(sortByDate);
            // modify dom
            insertNewCommentBlock(newComment);
        }
    }

    // make reply
    function makeReply(e) {
        e.preventDefault();
        const text = replyInput.value;
        replyInput.value = null;
        if (text.trim() != "") {
            const commentBlock = e.target.parentElement.parentElement;
            // add new reply to the datebase
            addCommentToServer();
            const originalComment = getCommentById(e.target.parentElement.parentElement.id);
            const newComment = new Comment(getCommentId(), currentUser.usrName, text, getDate());
            originalComment.addReply(newComment);
            originalComment.sortReply(sortByDate);
            // change dom
            insertNewSubCommentBlock(newComment, commentBlock);
        }
    }

    // for more bar
    // comment list is assumed to be sorted already
    function moreBarClick(e) {
        e.preventDefault();
        if (e.target.id == 'moreComment') {
            const counter = event.commentLoaded + loadNumber;
            commentArea.removeChild(e.target);
            // add event listener to each reply tag and more reply as well
            for (let i = event.commentLoaded ; i < event.comment.length && i < counter ; i++) {
                const newBlock = createCommentBlock(event.comment[i], false);
                const newReply = newBlock.querySelector('.reply');
                newReply.addEventListener("click", userReplyClick);
                const moreBar = newBlock.querySelector('.moreBar');
                if (moreBar != null) {
                    moreBar.addEventListener('click', moreBarClick);
                }
                commentArea.appendChild(newBlock);
                commentArea.appendChild(createNewElement('hr', 'cmLine', null, null));
                event.commentLoaded += 1;
            }
            if (event.commentLoaded < event.comment.length) {
                commentArea.appendChild(e.target);
            }
        }
        // more reply clicked
        else {
            const comment = getCommentById(e.target.parentElement.id);
            const commentBlock = e.target.parentElement.parentElement;
            commentBlock.removeChild(e.target.parentElement);
            const counter = comment.replyLoaded + loadNumber;

            for (let i = comment.replyLoaded ; i < comment.reply.length && i < counter ; i++) {
                const newBlock = createCommentBlock(comment.reply[i], true);
                newBlock.classList.add('subCommentBlock');
                commentBlock.appendChild(newBlock);
                comment.replyLoaded += 1;
            }
            if (comment.replyLoaded < comment.reply.length) {
                commentBlock.appendChild(e.target.parentElement);
            }
        }
    }
}

EventPopUp.prototype.getEventPopUp = function() {
    return this.popUp;
}
