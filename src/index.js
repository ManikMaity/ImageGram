import express from "express";
import connectDB from "./config/dbConfig.js";
import apiRouter from "./Routes/apiRouter.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {options} from "./utils/swaggerOption.js"
import ip from "ip";
const swaggerDocument = swaggerJsdoc(options);

const app = express();
const PORT = 3000;
app.use(express.json());

await connectDB();
app.get("/ping", (req, res) => {
    const ipAddress = ip.address();
    res.json({
        msg: "pong",
        ip: ipAddress
    });
})
app.use("/api", apiRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log("Server started on port http://localhost:3000");
});