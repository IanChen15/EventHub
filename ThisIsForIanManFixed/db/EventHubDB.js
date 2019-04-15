const mongoose = require('mongoose')

// connect to our database
mongoose.connect('mongodb+srv://team37:EventHub@cluster0-mltbt.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/EventHubDB', { useNewUrlParser: true});

module.exports = { mongoose }