const express = require('express')
const User = require('../models/users')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail,sendCancellationEmail }=require('../emails/accounts')
const router = new express.Router()
//create
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user.email,user.name)
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});
//user login 
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    // res.send({user:user,token:token})
    // res.send({user:user.getPublicProfile(),token:token})
    res.send({ user: user, token: token })
  } catch (e) {
    console.log(e)

    res.status(400).send()
  }
})
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})
//read all
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user)
  // try {
  //   const user = await User.find({});
  //   res.send(user);
  // } catch (error) {
  //   res.status(500).send();
  // }
});
//read
// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const user = await User.find({ _id });
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(500).send();
//   }
// });
//update
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  //  console.log(updates);
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update)
  })
  if (!isValidOperation) {
    return res.status(404).send("error: 'Invalid Updates!'")
  }

  try {
    //  const user=await User.findById(req.user._id)
    updates.forEach((update) => {
      req.user[update] = req.body[update]
    })
    await req.user.save()
    //  const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    //  if(!user){
    //      return res.status(404).send()
    //  }
    res.send(req.user)
  } catch (error) {
    res.status(400).send(error)
  }
})
//delete
router.delete('/users/me', auth, async (req, res) => {
  try {
    //  const user=await User.findByIdAndDelete(req.user._id)
    //  if (!user) {
    //    return res.status(404).send()  
    //  }
    req.user.remove()
    sendCancellationEmail(req.user.email,req.user.name)
    res.send(req.user)
  } catch (error) {
    res.status(500).send()
  }
})
const upload = multer({
  // dest:'avatars',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('please upload a image '))
    }
    cb(undefined, true)
  }
})
//upload image or update image
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  // req.user.avatar=req.file.buffer
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer() //converting image to png
  req.user.avatar = buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})
//delete image
router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})
//fetch image  // on browser
router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
      throw new Error()
    }

    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send()
  }
})
module.exports = router