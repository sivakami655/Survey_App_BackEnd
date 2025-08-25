import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter.js";
import surveyRouter from "./routes/surveyRouter.js";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use("/api/survey", surveyRouter);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map