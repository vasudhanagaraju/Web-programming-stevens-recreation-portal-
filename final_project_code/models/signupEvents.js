//Models have your schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Sign Up Event schema
var SignUpSchema = new Schema({
    Player: {type: Schema.Types.ObjectId, ref: 'User'},
    Match_name: {
        type: String
    },
    Event_name: {
        type: String
    }
});

var SignUpEvent = module.exports = mongoose.model('SignUp', SignUpSchema);


