var mongoose=require("mongoose");
var bcrypt=require("bcrypt-nodejs");

var userSchema=mongoose.Schema({
	facebook:{
		id:String,
		token:String,
		email:String,
		name:String
	},
	twitter:{
		id:String,
		token:String,
		displayName:String,
		username:String
	}
});

module.exports=mongoose.model('User',userSchema);
