var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')
var userSchema = new Schema ({
    name: {
        type:String,
        required:true,
        maxlength:25},
    email: String,
    password: String,
})
userSchema.pre('save', function(next) {
    if (this.password) {
        this.password = bcrypt.hashSync(this.password, 10)
        return next();
    }
})
userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password,this.password)
}


var User = mongoose.model('User', userSchema);
module.exports = User;
