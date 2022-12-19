const express = require("express");
const cors = require("cors");
const Routes = require("./routes/index");
require("./job/change_status");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(Routes);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
