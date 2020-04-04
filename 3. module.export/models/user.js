var mongoose = require("mongoose");

//User Schema
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]  
});

//var User = new mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);