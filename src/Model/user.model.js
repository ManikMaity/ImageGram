import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { SALT_ROUND } from "../config/serverConfig.js";

const userSchema = new Schema({
    username : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : (value) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message : (props) => `${props.value} is not a valid email`
        }

    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["user", "admin"],
        default : "user"
    }
}, {timestamps : true});

userSchema.pre("save", function modifyPassword(next){
    const user = this;
    const hashedPassword = bcrypt.hashSync(user.password, SALT_ROUND);
    user.password = hashedPassword;
    next();
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;