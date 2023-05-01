const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const messageSchema = new mongoose.Schema({
    Chatuser:{
        type:Array,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    Sender:{
        type:ObjectId,
        ref:"DRDOCUSER"
    }
},{timestamps:true})

mongoose.model("DRDOCMESSAGE", messageSchema) 