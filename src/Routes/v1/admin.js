import express from "express";
const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
    res.json({msg : "Admin Page"});
});

adminRouter.get("/profile", (req, res) => {
    res.json({msg : "Admin Profile"});
});

export default adminRouter;