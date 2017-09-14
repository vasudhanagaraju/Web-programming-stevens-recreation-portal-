// Schema for slot
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Slot Schema
var BookingSchema = new Schema({
    name:{
        type: String
    },
    date:{
        type: String 
    },
    time:{
        type: String
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Slot',BookingSchema);
