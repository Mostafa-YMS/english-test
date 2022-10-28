import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { serverRouter } from "./routes/index";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use("/", serverRouter);
