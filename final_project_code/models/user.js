//Models have your schema
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


//User schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    name: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

//Check if you have to use promise
module.exports.createUser = function(newUser, callback){
    if(!newUser)
        Promise.reject("User not found");
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, null,function(err, hash) {
        // Store hash in your password DB. 
        newUser.password = hash;
        newUser.save(callback);
});
});
}

//Retrive the user name
module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

//Retrive the user ID
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

//Compare password
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}