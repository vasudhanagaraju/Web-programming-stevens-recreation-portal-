// Schema for result
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Result Schema
var ResultSchema = new Schema({
    Match_name:{
        type: String
    },
    Event_name:{
        type: String 
    },
    Teams :{
        type: String
    },
    Result : {
        type: String
    },
    Video: {
        type: String
    },
    Creator: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Result',ResultSchema);
