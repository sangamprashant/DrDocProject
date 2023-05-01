const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin");
const POST = mongoose.model("DRDOCPOST");
const USER = mongoose.model("DRDOCUSER");
const MESSAGE = mongoose.model("DRDOCMESSAGE");


//all doctor getting
router.get("/message/doctor", (req,res)=>{
    USER.find({account:"Doctor"}, function (err, user){
        if(err){
            res.send("something went wrong");
            next();

        } res.json(user)
    })
})
//all doctor getting
router.get("/message/regular", (req,res)=>{
    USER.find({account:"Regular"}, function (err, user){
        if(err){
            res.send("something went wrong");
            next();

        } res.json(user)
    })
})
//creatte message
router.post("/message/send",requirelogin,(req, res) => {
   
      const { from , to, message}=req.body;
      if (!message ) {
        return res.status(422).json({ error: "Please add a message" })
    }

      const newMessage =  MESSAGE.create({
        message:message,
        Chatuser:[from,to],
        Sender:from
      })
      .then((result) => {
        return res.json({ newMessage: result })
    }).catch(err => console.log(err))
})
  

//creatte message
router.get("/message/:user1id/:user2id", async (req, res) => {
  try {
    const from = req.params.user1id;
    const to = req.params.user2id;
    const newMessage = await MESSAGE.find({
      Chatuser: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const allmessage = newMessage.map((msg) => {
      return {
        myself: msg.Sender.toString() == from,
        message: msg.message,
      };
    });

    return res.status(200).json(allmessage);
  } catch (error) {
        return res.status(500).status("Internal server error")
  }
});

module.exports = router;
