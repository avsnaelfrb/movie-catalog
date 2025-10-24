require("dotenv").config();
import express from "express";
import cors from "cors";
import router from "./src/routes/mainroute.js"
const app = express();
const port = 3000;


const corsOp = {
  origin: process.env.CORS_ALLOW_LIST.split(","),
  optionsSuccessStatus: 200,
};

app.use(cors(corsOp));
app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`server berjalan di http://localhost:${port}`);
});
