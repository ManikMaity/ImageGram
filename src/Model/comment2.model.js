import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content : {
        type : String,
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    onModel : {
        type : String,
        required : true,
        enum : ["Post", "Comment"]
    },
    commentableId : {
        type : Schema.Types.ObjectId,
        required : true,
        refPath : "onModel"
    },

    replies : [
        {
            type : Schema.Types.ObjectId,
            ref : "Comment"
        }
    ]
}, {timestamps : true});


const CommentModel2 = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default CommentModel2;

