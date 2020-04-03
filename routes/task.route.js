const router = require("express").Router();
const mongoose = require("mongoose");
var nodemailer = require("nodemailer");
const cors = require("cors");

const Task = mongoose.model("task");

router.use(cors());
router.post("/addtask", async function(req, res) {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    var taskData = new Task();
    taskData.taskTitle = req.body.taskTitle;
    taskData.taskDesc = req.body.taskDesc;
    taskData.taskDate = req.body.taskDate;
    taskData.taskPri = req.body.taskPri;

    // taskData.find({ taskTitle: taskData.taskTitle }, function(err, dataFind) {
    //   if (err) console.log(err);
    //   //console.log(dataFind);
    //   if (dataFind.length > 0) {
    //     res.json({ alredyReg: "Already Added this task!" });
    //   } else {

    taskData.save();

    res.json({ succMsg: "success" });
    //   }
    // });
  } catch (error) {
    res.json({ errMsg: "error" });

    console.log("Error : " + error);
  }
});

router.get("/viewtask", async function(req, res) {
  try {
    const result = await Task.find();

    res.json({ findAllRec: result });
  } catch (error) {
    console.log(error);
  }
});

router.post("/deletetask", async function(req, res) {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    //console.log("innnnn");
    res.setHeader("Content-Type", "application/json");

    const deleteId = req.body.deleteId;

    var deleteRec = await Task.findOneAndRemove({ _id: deleteId });

    var deleteCount = Object.keys(deleteRec).length;

    if (deleteCount > 0) {
      res.json({ succMsg: "success" });
    } else {
      res.json({ errMsg: "error" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/getEditTaskList", async function(req, res) {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    //console.log("innnnn");
    res.setHeader("Content-Type", "application/json");

    let taskId = req.body.editID;

    const findOneData = await Task.find({ _id: taskId });
    var findCount = Object.keys(findOneData).length;

    if (findCount > 0) {
      res.json({ findTaskData: findOneData });
    } else {
      res.json({ msg: "error" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/updateTask", async function(req, res) {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    let updId = req.body.editId;
    let updData = req.body.updatedata;

    let findBeforeupdateUser = await Task.findOne({ _id: updId });

    const taskUpate = await Task.findOneAndUpdate({ _id: updId }, updData);

    const findupdateTask = await Task.findOne({ _id: updId });

    var findCount = Object.keys(findupdateTask).length;

    if (findCount > 0) {
      //console.log(findupdateUser);
      res.json({ findTaskData: findupdateTask });
    } else {
      console.log("err");
      res.json({ msg: "error" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
