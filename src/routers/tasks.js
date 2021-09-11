const express = require("express");
const Tasks = require("../models/tasks");
const auth = require("../middleware/auth");
const router = new express.Router();

//create
router.post("/tasks", auth, async (req, res) => {
  // const tasks = new Tasks(req.body);
  const tasks = new Tasks({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await tasks.save();
    res.status(201).send(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
});
//read all //tasks?completed=true
//tasks?limit=10&skip=10  /skip=skip from the limit means next 10 after limit of 10 *skip the first 10*
//tasks?sortBy=createdAt:desc(ar asc)
router.get("/tasks",auth, async (req, res) => {
  const match={}
  const sort = {}
  if(req.query.completed){
     match.completed=req.query.completed==='true'
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }
  //  console.log(sort)
  try {
  //  const tasks = await Tasks.find({owner:req.user._id,completed:match.completed});
    // await req.user.populate('tasks'
    await req.user.populate({
      path:'tasks',
      match:match,
      options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort:sort
      }
    })
    res.send(req.user.tasks);
    // res.send(tasks);
  } catch (error) {
    console.log(error);
    
    res.status(500).send();
  }
});
//read
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
      const task = await Tasks.findOne({ _id, owner: req.user._id })

      if (!task) {
          return res.status(404).send()
      }

      res.send(task)
  } catch (e) {
    console.log(e);
      
    res.status(500).send()
  }
})
//update
router.patch("/tasks/:id",auth, async (req, res) => {
  const updates = Object.keys(req.body);
  //  console.log(updates);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(404).send("error: 'Invalid Updates! for tasks'");
  }
  // try {
  //   const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
  //   // const task = await Tasks.findById(req.params.id);
  //   updates.forEach((update) => {
  //     task[update] = req.body[update];
  //   });
  //   await task.save();
  //   // const task=await Tasks.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
  //   if (!task) {
  //     return res.status(404).send();
  //   }
  //   res.send(task);
  // }
  try {
    const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id})

    if (!task) {
        return res.status(404).send()
    }

    updates.forEach((update) => task[update] = req.body[update])
    await task.save()
    res.send(task)
}
   catch (error) {
    res.status(400).send(error);
  }
});
//delete
router.delete("/tasks/:id",auth, async (req, res) => {
  try {
    // const task = await Tasks.findByIdAndDelete(req.params.id);
    const task = await Tasks.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    console.log(error);
    
    res.status(500).send();
  }
});

module.exports = router;
