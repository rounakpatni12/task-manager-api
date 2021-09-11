const express = require("express");
require("./db/moongoose");
// const User = require("./models/users");
// const Tasks = require("./models/tasks");
const userRouter = require("./routers/users");
const taskRouter = require("./routers/tasks");
const app = express();
const port = process.env.PORT ;

// app.use((req,res,next)=>{
//   console.log(req.method,req.path);
//   next()

// })

app.use(express.json()); //parse incoming json to a object
app.use(userRouter);
app.use(taskRouter);

// const multer = require("multer");
// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     // if (!file.originalname.endsWith('.pdf')) {
//     //   return cb(new Error('please upload pdf file'))
//     // }
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("please upload a doc/docx file"));
//     }
//     cb(undefined, true);
//     //  cb(new Error('please upload pdf file'))
//     //  cb(undefined,true)
//     //  cb(undefined,false)
//   },
// });

// app.post("/upload", upload.single("myupload"), (req, res) => {
//   res.send();
// });

// const bcrypt=require('bcryptjs')

// const myfn=async()=>{
// const password='rounak@900'
// const hashpassword= await bcrypt.hash(password,8)
// console.log(password);
// console.log(hashpassword);
// const isMatch=await bcrypt.compare('rounmak@900',hashpassword)
// console.log(isMatch);

// }
// myfn()

// const jwt=require('jsonwebtoken')
// const myfn=async ()=>{
//   const token=jwt.sign({id:"hjgkk"},"mynm",{expiresIn:'2 weeks'})
//   console.log(token);
//   const data=jwt.verify(token,'mynm')
//   console.log(data);

// }
// myfn()
// create
// app.post('/users',(req,res)=>{
//     // console.log(req.body);
//     // res.send("testing!")
//     const user=new User(req.body)
//     user.save().then((result) => {
//             res.status(201).send(user)
//     }).catch((err) => {
//         res.status(400).send(err)
//         // res.send(err)
//     });
// })

//read
// app.get('/users',(req,res)=>{
// User.find({}).then((result) => {
//     res.send(result)
// }).catch((err) => {
//   res.status(500).send()
// });
// })
//read
// app.get('/users/:id',(req,res)=>{
//     // console.log(req.params);
//     const _id=req.params.id
//     User.findById(_id).then((result) => {
//         if (!result) {
//         return res.status(404).send()
//         }
//         res.send(result)
//     }).catch((err) => {
//         res.status(500).send()
//     });
// })
//update

// read
// app.get("/tasks", (req, res) => {
//   Tasks.find({})
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       res.status(500).send();
//     });
// });
// //read
// app.get("/tasks/:id", (req, res) => {
//   // console.log(req.params);
//   const _id = req.params.id;
//   Tasks.findById(_id)
//     .then((result) => {
//       if (!result) {
//         return res.status(404).send();
//       }
//       res.send(result);
//     })
//     .catch((err) => {
//       res.status(500).send();
//     });
// });

// create
// app.post("/tasks", (req, res) => {
//   // res.send("tasks response")
//   // console.log(req.body);
//   const tasks = new Tasks(req.body);
//   tasks
//     .save()
//     .then((result) => {
//       res.status(201).send(tasks);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// app.listen(port, () => {
//   console.log(`port running on  ${port}`);
// });

app.listen(port, () => {
  console.log(`port running on  ${port}`);
});
