const express = require("express");
const cors=require("cors");
require("./db/mongoose");
const app = express();

const port = process.env.PORT || 3000;
const user = require("./routes/User");
const login = require("./routes/Login");
const budget = require("./routes/Budget");
app.use(express.json());
 
 app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
  ));

app.use(user);
app.use(login);
app.use(budget)
app.listen(port,() => {
    console.log(`Application is running on ${port}`);
});