const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Tasks=require('./tasks')
const userSchema=new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("fail ss");
      }
    },
  },
  email: {
    type: String,
    unique:true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("inavalid email");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("-ve not allowed");
      }
    },
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }],
  
    avatar:{
       type:Buffer
    }
  
},{
  timestamps:true
})
userSchema.virtual('tasks',{
  ref:'tasks',
  localField:'_id',
  foreignField: 'owner',

})
userSchema.methods.toJSON= function () {
  const user=this
  const userObject=user.toObject()
  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar
  return userObject
}
userSchema.methods.generateAuthToken=async function (){
  const user=this
  // const token=jwt.sign({_id:user._id.toString()},'see env variable in config folder')
  const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
  user.tokens=user.tokens.concat({token:token})
  await user.save()
  return token

}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })  
  if (!user) {
      throw new Error('Unable to login user dont exist')
  }
  const isMatch = await bcrypt.compare(password, user.password)  
  if (!isMatch) {
      throw new Error('Unable to login')
  }

  return user
}
//hash the plain text password before saving
userSchema.pre('save',async function (next) {
  const user=this
   if (user.isModified('password')) {
     user.password=await bcrypt.hash(user.password,8)
   }

  next()
})
//delete tasks when user is removed
userSchema.pre('remove',async function(next){
  const user=this
  await Tasks.deleteMany({owner:user._id})
  next()
})
const User = mongoose.model("user",userSchema );

module.exports = User;
