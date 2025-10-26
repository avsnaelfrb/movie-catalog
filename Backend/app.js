import 'dotenv/config';
import express from "express";
import cors from "cors";
import router from "./src/routes/mainroute.js";

const app = express();

const corsOp = {
  origin: process.env.CORS_ALLOW_LIST.split(","),
  optionsSuccessStatus: 200
};

app.use(cors(corsOp));
app.use(express.json());
app.use(express.static('public'));

app.use("/api", router);


const port = process.env.PORT || 5000; // Ambil PORT dari .env atau default 5000

app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});