var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
   username: String,
   password: String,
   forNavn: String,
   etterNavn: String,
   email: String,
   avatar: String,
   isAdmin: {
      type: Boolean,
      default: false
   }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);