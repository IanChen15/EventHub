'use strict'
const log = console.log

const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const session = require('express-session')
const { ObjectID } = require('mongodb')
const fs = require('fs');
// Mongoose
const  mongoose  = require('mongoose')
const { EventHubDB } = require('./db/EventHubDB')
const { Event } = require('./models/event')
const { User } = require('./models/user')
const { Interest } = require('./models/interest')

// Express
const port = process.env.PORT || 3000
const app = express();

const uploadPhotosDir = `${__dirname}/public/uploads/`
// body-parser middleware setup.  Will parse the JSON and convert to object
// app.use(bodyParser.json());
// parse incoming parameters to req.body
app.use(bodyParser.urlencoded({ extended:true }))
app.use(fileUpload());
// Add express sesssion middleware
app.use(session({
	secret: 'oursecret',
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 600000,
		httpOnly: true
	}
}))
// set the view library
app.set('view engine', 'hbs')

// static js directory
app.use("/js", express.static(__dirname + '/public/js'))
app.use("/css", express.static(__dirname + '/public/css'))
app.use("/html", express.static(__dirname + '/public/html'))
app.use("/pictures", express.static(__dirname + '/public/pictures'))
app.use("/uploads", express.static(__dirname + '/public/uploads'))

// Add middleware to check for logged-in users
const sessionChecker = (req, res, next) => {
	req.session.username = "admin"
    next();
    // if (req.session.user) {
	// 	res.redirect('dashboard')
	// } else {
	// 	next();
	// }
}

function saveFile(file){
	let [filename, filetype] = file.name.split(".")
	let suffix = ".";
	let num = 0;
	while(fs.existsSync(uploadPhotosDir + filename + suffix + filetype)){
		suffix = `${++num}.`;
	}	
	return new Promise (function(resolve, reject) {
		file.mv(uploadPhotosDir + filename + suffix + filetype).then(_ => {
			resolve('/uploads/'+ filename + suffix + filetype);
		}).catch(err => {
			reject(err);
		});
	});
}
app.get('/', sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/html/main.html');
})


app.post('/events', (req, res) => {
	log(req.files.eventPhotos)
	log(req.body)

	// req.files.sampleFile.mv(__dirname + `/uploads/${req.files.sampleFile.name}`, function(err) {
	// 	if (err)
	// 	  return res.status(500).send(err);
	
	// 	res.send('File uploaded!');
	//   });

})


// For new event.
// Request body is an event object class.
app.post('/event', sessionChecker, (req, res) => {
	User.findOne({"username": req.session.username}, (err, usr) =>{
		if(err) {
			res.status(400).send(err);
		}
		if(usr) {
			Interest.find({"interest": req.body.types}, (err, results) =>{
				if(err) {
					res.status(400).send(err)
				}
				if (typeof req.body.types == "string"){
					req.body.types = [req.body.types];
				}
				if(results && (results.length == req.body.types.length)) {
					let eventType = [];
					for(let i = 0; i< results.length; i++) {
						eventType.push(results[i]._id);
					}
					function saveEvent(imgs) {
						return new Promise (function(resolve, reject) {
							const newEvent = new Event({
								title: req.body.title,
								creator: usr._id,
								location: req.body.location,
								date: new Date(req.body.date),
								description: req.body.description,
								img: imgs,
								eventType: eventType,
								comments: [],
								numFollows: 0,
								allowComments: req.body.allowComments == null ? false : true
							})
							// save restaurant to the database
							newEvent.save().then((event) => {
								resolve(event);
							}).then((error) => {
								reject(error) // 400 for bad request
							})	
						})
					}
					let eventPhotos = req.files.eventPhotos;
					if (eventPhotos == null){ // If there is no photo
						saveEvent([]).then(event => {
							res.send(event);
						}).catch(err => {
							res.status(400).send(err);
						})
					} else if (eventPhotos[0] == null) { // If this is not an array, i.e. only one file
						saveFile(eventPhotos).then(filename => {
							saveEvent([filename]).then(event => {
								res.send(event);
							}).catch(err => {
								res.status(400).send(err);
							})
						}
						).catch(err => {
							res.send(500).send(err);
						})
					} else {
						let promises = [];
						eventPhotos.forEach(file => {
							promises.push(saveFile(file));
						});
						Promise.all(promises).then(files => {
							saveEvent(files).then(event => {
								res.send(event);
							}).catch(err => {
								res.status(400).send(err);
							})
						}

						).catch(err => {
							res.send(500).send(err);
						})
					}
				} 
				else {
					// Don't have result, do something...
					res.status(404).send();
				}
			});
		} 
		else {
			// Don't have result, do something...
			res.status(404).send();
		}
	});
	
})

// For creating user.
/*
Request body expects:
{
	"username": <username>
	"email" : <email>
	"password": <password>
	"bday": <bday>	
}
*/
app.post('/users', (req, res) => {
	log(req)
	User.find({"username": req.body.username}, (err, doc) => {
		if(err) {
				

			res.status(400).send(err)
		}
		if(doc.length == 0) {
			log(req.body);
			log(req.body.email);
			log(req.body.password);
			log(req.body.username);
			log(req.body.bday);
			const user  = new User({
				email: req.body.email,
				password: req.body.password, // Do encryption first.
				username: req.body.username,
				birthday: req.body.bday,
				description: "",
				interests: [],
				followedEvents: [],
				follows: [],
				followers: [],
				admin: false,
				profilePic: "../imgFiles/face.jpg"
			})
			log(user)
			user.save().then((user) => {
					res.send(user)
					// do open main page?
				}, (error) => {
					res.status(400).send(error) // 400 for bad request
			})	
		}
		else {
			res.status(400).send()
		}
	})
})
// Get the object, make sure that all detail are correct before returning.
app.delete('/users', (req, res) => {
	
})

app.delete('/events', (req, res) => {
	
})

// do editing event 
//////////

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});


 
  
  
  
