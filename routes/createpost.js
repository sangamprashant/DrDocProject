const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin");
const POST = mongoose.model("DRDOCPOST")
const USER = mongoose.model("DRDOCUSER")


// Route
router.post("/api/createpost", requirelogin, (req, res) => {
    const { body, pic } = req.body;
    console.log(pic)
    if (!body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    console.log(req.user)
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user,
        postedTo: req.user
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})

// Route
router.get("/allposts",(req, res) => {
    POST.find()
    .populate("postedBy", "_id name userName Photo account")
    .populate("postedTo", "_id name userName Photo account")
    .sort("-createdAt")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})

//
router.get("/api/myposts", requirelogin, (req, res) => {
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name userName email")
        .populate("postedTo", "_id name userName email")
        .then(myposts => {
            res.json(myposts)
        })
})


  

module.exports = router