import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import usersRouter from "./routes/users.js";

const PORT = /*process.env.PORT ||*/ 5000;
const app = express();

//const usersRouter = require('./routes/users.js');

app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/users", usersRouter);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});