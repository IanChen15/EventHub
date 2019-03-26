/* user.js User model */

const mongoose = require('mongoose')
const validator = require('validator')
const ObjectId = mongoose.Schema.Types.ObjectId;

const NotificationSchema = new mongoose.Schema({
    event: {
        type: ObjectId,
        ref: 'Event',
    }, 
    message: {
        type: String,
        minlength: 1
    }
})
// let's make a mongoose model a little differently
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Not valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 4
	},
	username:{
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true
	},
	birthday:{
		type: Date,
		required: true
	},
	description:{
		type: String,
		required: true,
		minlength: 1
	},
	interests:[{
		type: ObjectId,
		ref: "Interest"
	}],
	followedEvents: [{
		type: ObjectId,
		ref: "Event"
	}],
	follows: [{
		type: ObjectId,
		ref: "User"
	}],
	followers: [{
		type: ObjectId,
		ref: "User"
	}],
	admin: {
		type: Boolean
	},
	profilePic: {
		type: String
    }, 
    notifications: [{
        type: ObjectId, 
        ref: "Notification"
    }]
})

const User = mongoose.model('User', UserSchema)
const Notification = mongoose.model('Notification', NotificationSchema)
module.exports = { User: User, Notification: Notification }







