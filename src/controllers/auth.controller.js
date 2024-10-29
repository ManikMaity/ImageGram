import { signinService, signupService } from "../services/authService.js";

export async function signupController(req, res) {
    try{
        const {username, email, password} = req.body;
        const response = await signupService(username, email, password);
        res.json({
            success : true,
            message : "User created successfully",
            data : response
        })
    }
    catch(err){
        if (err.status === 409) {
            res.status(err.status).json({
                success : false,
                message : err.message
            });
        }
        else {
            res.status(500).json({
                success : false,
                message : err.message
            });
        }
    }
}


export async function signinController(req, res) {
    try{
        const {email, password} = req.body;
        const response = await signinService(email, password);
        res.json({
            success : true,
            message : "User signed in successfully",
            token : response
        })

    }
    catch(err){
        if (err.status){
            res.status(err.status).json({
                success : false,
                message : err.message
            });
        }
        else {
            res.status(500).json({
                success : false,
                message : err.message
            });
        }
      
    }
}