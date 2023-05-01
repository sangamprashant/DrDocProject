const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        require: true
    },
    postedBy:{
        type:ObjectId,
        ref:"DRDOCUSER"
    },
    postedTo:{
        type:ObjectId,
        ref:"DRDOCUSER"
    }
}, { timestamps: true })

mongoose.model("DRDOCPOST", postSchema)