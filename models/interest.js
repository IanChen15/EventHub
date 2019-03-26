/* user.js User model */

const mongoose = require('mongoose')

// let's make a mongoose model a little differently
const InterestSchema = new mongoose.Schema({
	interest: {
		type: String,
		required: true,
		unique: true,
		trim: true
	}
})

const Interest = mongoose.model('Interest', InterestSchema)

module.exports = { Interest }







