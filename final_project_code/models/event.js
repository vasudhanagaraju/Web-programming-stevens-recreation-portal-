//Models have your schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Event schema
var EventSchema = new Schema({
    Date: {
        type: String
    },
    Match_name: {
        type: String
    },
    Event_name: {
        type: String
    },
    Team1: {
        type: String
    },
    Team2: {
        type: String
    },
    Venue: {
        type: String
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

var Event = module.exports = mongoose.model('Event', EventSchema);

//Retrive the all events
module.exports.getAllEvents = function(){
    Event.find(Venue);
}

