import mongoose from "mongoose";
const Schema = mongoose.Schema;

const likesSchema = new Schema({
    onModel : {
        type : String,
        required : true,
        enum : ["Post", "Comment"]
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    likableId : {
        type : Schema.Types.ObjectId,
        refPath : "onModel",
        required : true
    },
    likeType : {
        type : String,
        required : true,
        default : "like",
        enum : ["like", "unlike", "heart", "love", "sad", "angry"]
    }
}, {timestamps : true});


const LikeModel = mongoose.model("Like", likesSchema);
export default LikeModel;