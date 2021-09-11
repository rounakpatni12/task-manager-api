const mongoose = require("mongoose");
// const validator=require('validator')
// mongoose.connect("set env variable in config folder", {
//   useNewUrlParser: true  
// });
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true  
});

// const User = mongoose.model("user", {
//   name: {
//     type: String,
//     required:true,
//     trim:true   
//   },
//   password:{
//       type:String,
//       trim:true,
//       lowercase:true,
//       minlength:6,
//       validate(value){
//           if ( value.includes('password')) {
//                throw new Error("fail ss")
//           }
//       }
//   },
//   email:{
//       type:String,
//       required:true,
//       trim:true,
//       lowercase:true,
//       validate(value){
//           if (!validator.isEmail(value)) {
//               throw new Error("inavalid email")
//           }
//       }
//   },
//   age: {
//     type: Number,
//     default:0,
//     validate(value){
//       if (value<0) {
//           throw new Error("-ve not allowed")
//       }
//     }
//   },
// });

// const User1=new User({
//     name:"qqaaaaa    ",
//     email:'   AAARRRr@gmail.com    ',
//     password:"8cdsdfspaSSwordcadc    "
// })

// User1.save().then((result) => {
//     console.log(User1);
    
// }).catch((err) => {
//    console.log('errpr: ',err);
    
// });

// const Tasks = mongoose.model("tasks", {
//     description: {
//       type: String,
//       trim:true,
//       required:true
//     },
//     completed: {
//       type: Boolean,
//       default:false
//     },
//   });
  
//   const Task1=new Tasks({
//     description:'go gym',
//     completed:true
// })
 
// Task1.save().then((result) => {
//     console.log(Task1);
    
// }).catch((err) => {
//    console.log('errpr: ',err);
    
// });
