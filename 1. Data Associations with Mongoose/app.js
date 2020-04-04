var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/data-asc", {useNewUrlParser:true, useUnifiedTopology:true});

//Post Schema
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = new mongoose.model("Post", postSchema);

//User Schema
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema]  //array of posts //postSchema is in the array
});

var User = new mongoose.model("User", userSchema);

var newUser = new User({
    name:"Harry",
    email:"harry@hogwarts.com"
});

// newUser.posts.push({
//     title:"How to Kill Voldemort!",
//     content: "I am still finding the best way!"
// });

// newUser.save(function(err, user){
//     if(err) {console.log("Error!");}
//     else{ console.log(user);}
// });

// User.findOne({name:"Harry"}, function(err, foundUser){
//     if(err) { console.log("Error!");}
//     else { console.log(foundUser);}
// });

User.findOne({name:"Harry"}, function(err, foundUser){ //callback hell
    if(err) { console.log("Error!");}
    else {
        foundUser.posts.push({
            title: "My favorite book?",
            content: "Well I would tell you very soon!"
        });
        foundUser.save(function(err, user){
            if(err) { console.log("ERROR!");}
            else{ console.log(user);}
        });
    }
});