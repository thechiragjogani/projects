const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});


UserSchema.post('save',function(doc,next){
    console.log("new user was created and saved",doc)

    next() // to further send the response
})



UserSchema.pre('save',async function(next){ // we do not get 

    console.log("function running before saving the file ")
    let salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    console.log("encrypted password : ", this.password)
    next()
})

UserSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    
    // console.log("static login function ")

    console.log("user :",user)
    if(user){
        console.log("inside if", user.password)
        const auth = await bcrypt.compare(password,user.password)
        console.log("is auth :", auth)
        if(auth){
            return user
        }

        throw Error("incorrect password")
    }
    console.log("throwing error")
    throw Error("incorrect Email")
}



exports.User = mongoose.model("User", UserSchema)


