var mongoose = require("mongoose");

//Post Schema
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

//var Post = new mongoose.model("Post", postSchema);

module.exports = mongoose.model("Post", postSchema);