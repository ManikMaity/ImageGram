import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const commentSchema = new Schema({
    content : {
        type : String,
        required : true
    },
    postId : {
        type : ObjectId,
        required : true,
        ref : "Post"
    },
    userId : {
        type : ObjectId,
        required : true,
        ref : "User"
    }
}, {timestamps : true})


const CommentModel = mongoose.model("Comment", commentSchema);
export default CommentModel