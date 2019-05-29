var mongoose = require('mongoose')
var Schema = mongoose.Schema
var articleSchema = new Schema ({
    title: String,
    email: String,
    tags: [String],
    articleid:Schema.Types.ObjectId
})
var Article = mongoose.model('article', articleSchema);
module.exports = Article;