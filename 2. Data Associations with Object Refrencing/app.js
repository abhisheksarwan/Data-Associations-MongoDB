var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/data-asc-ref", {useNewUrlParser:true, useUnifiedTopology:true});

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
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]  
});

var User = new mongoose.model("User", userSchema);

User.create({                   //create a user
    name:"Abhishek",
    email:"abhishek@xyz.com"
});

Post.create({                    //create a post and push id of that post to array  //callback hell
    title:"Abhishek's Post 2",
    content: "Soon"
}, function(err, post){
    if(err) {console.log("ERROR!");}
    else{
    User.findOne({name:"Abhishek"}, function(err, foundUser){
        if(err) {console.log("ERROR!");}
        else {
            foundUser.posts.push(post);
            foundUser.save(function(err, user){
                if(err) {console.log("error!");}
                else {console.log(user);}
            });
        }
    });
}
});

//will present all the data //all the data of the user's posts will be populated
User.findOne({name:"Abhishek"}).populate("posts").exec(function(err, user){ 
    if(err) { console.log("Error!");}
    else{
        console.log(user);
    }
});
