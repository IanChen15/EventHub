/* server.js - mar11 - 6pm - mongoose*/
'use strict'
const log = console.log

//const express = require('express')
//const port = process.env.PORT || 3000
const { ObjectID } = require('mongodb')
const  mongoose  = require('mongoose')
const { EventHubDB } = require('../db/EventHubDB')

const { Event } = require('../models/event')
const { Comment } = require('../models/event')
const { User } = require('../models/user')
const { Interest } = require('../models/interest')


const interest = new Interest({
	interest: "Cs"
})
const interest2 = new Interest({
	interest: "Math"
})
const interest3 = new Interest({
	interest: "Group study"
})
const interest4 = new Interest({
	interest: "Party"
})
const interest5 = new Interest({
	interest: "Other"
})
interest.save()
interest2.save()
interest3.save()
interest4.save()
interest5.save()
const user1 = new User({
    email: "user@admin.admin",
    password: "user",
    username: "user",
    birthday: new Date("2000 Feb 29"),
    description: "I am a boring user",
    interests: new mongoose.Types.ObjectId(interest._id),
    followedEvents: [],
    follows: [],
    followers: [],
    admin: false,
    profilePic: "../imgFile/face.jpg"
});

const comment = new Comment({
    user: new mongoose.Types.ObjectId(user1._id),
    message: "Bill is stupid!!!",
    date: new Date()
})
const event1 = new Event({
	title: "Anime North 2019",
	creator: new mongoose.Types.ObjectId(user1._id),
	location: "Toronto Congress Centre / Delta Hotels by Marriott Toronto Airport (formerly the International Plaza) 650 Dixon Road Toronto, Ontario M9W 1J1",
	date: new Date(),
	description: "Anime North is Toronto's largest fan-run Japanese Animation convention.",
	img: ["../w3.png"],
	eventType: [new mongoose.Types.ObjectId(interest._id)],
    comments: [comment],
    followers: [],
    numFollows: 0,
    allowComments: true
});
let d = new Date();
d.setHours(23, 0, 0, 0);
const event2 = new Event({
	title: "Toronto Life Best Restaurants 2019",
	creator: new mongoose.Types.ObjectId(user1._id),
	location: "Evergreen Brick Works, 550 Bayview Avenue Toronto, ON M4W 3X8",
	date: d,
	description: "Toronto foodies, this is the event you’ve waited all year for: On April 29.",
	img: ["../w3.png"],
	eventType: [new mongoose.Types.ObjectId(interest._id), new mongoose.Types.ObjectId(interest2._id)],
    comments: [comment],
    followers: [],
    numFollows: 0,
    allowComments: true
});

const user2 = new User({
    email: "admin@admin.admin",
    password: "admin",
    username: "admin",
    birthday: new Date("2000 Feb 29"),
    description: "I am a boring admin",
    interests: new mongoose.Types.ObjectId(interest._id),
    followedEvents: [new mongoose.Types.ObjectId(event1._id), new mongoose.Types.ObjectId(event2._id)],
    follows: [],
    followers: [],
    admin: false,
    profilePic: "../imgFile/face.jpg"
});
user1.save(function (err, cs) {
	console.log(err)
});
 event1.save(function (err, cs) {
    if (err) return console.error(err);
    console.log("aya");
  });
event2.save()
user2.save()