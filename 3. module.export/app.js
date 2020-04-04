var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/data-asc-ref", {useNewUrlParser:true, useUnifiedTopology:true});

//use of module.exports
var Post = require("./models/post");           
var User = require("./models/user");

//create a user
User.create({                  
    name:"Shivam",
    email:"abhishek@xyz.com"
});

 //create a post and push id of that post to array  //callback hell
Post.create({                   
    title:"Shivams's Post 3",
    content: "Soon"
}, function(err, post){
    if(err) {console.log("ERROR!");}
    else{
    User.findOne({name:"Shivam"}, function(err, foundUser){
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

//will present all the data //all the data of the user will posts populated
User.findOne({name:"Shivam"}).populate("posts").exec(function(err, user){ 
    if(err) { console.log("Error!");}
    else{
        console.log(user);
    }
});
