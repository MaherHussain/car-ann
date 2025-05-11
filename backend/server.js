import dbconnection from './db/connection.js'
import express from 'express'
import config from './config.js'
import { userRouter, verifyRouter } from "./routes/index.js";
import { deleteExpiredUsers } from "./utilis/removeExpiredUser.js";
import cron from "node-cron";

const app = express();

const port = config.port;

dbconnection();
// Run cleanup job every day at midnight
cron.schedule("0 0 * * *", async () => {
  await deleteExpiredUsers();
});

app.get("/", (_, res) => {
  res.send("Hello World i am new test test !");
});

app.use(express.json());
// Auth Endpoints

app.use("/api/user", userRouter);
app.use("/", verifyRouter); 

app.listen(port, () => {
    console.log(`The app listening on port ${port}`)
})