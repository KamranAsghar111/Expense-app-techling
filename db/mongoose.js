const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://Task:kamran@cluster0.jsymr.mongodb.net/Expense")
  .then(() => {
    console.log("connection successful");
  })
  .catch((e) => {
    console.log(e);
  });

  
  // mongodb+srv://Task:kamran@cluster0.jsymr.mongodb.net/test
  //mongodb://localhost:27017/Expense-App