const Budget = require("../models/Budget");
const postBudget = async (req, res) => {
  const _id = req.user._id.toString();
  try {
    const budget = Budget({
      ...req.body,
      User: req.user._id,
    });
    const bud = await Budget.find();
    console.log(bud +"hello");
    const UserBudget = bud.filter((b) => _id == b.User.toString());
    console.log(UserBudget +"userbudget");
    let TotalBudget = 0;
   
    for (let index = 0; index < UserBudget.length; index++) {
      TotalBudget += UserBudget[index].total;
    }
    
    if (req.body.amountType == "earning" || req.body.amountType == "expense") {
    
      if (req.body.amountType == "expense" && TotalBudget<req.body.amount) {
        res.send("low balance")
      }else{
        if (req.body.amountType == "earning") {
          budget.earning = req.body.amount;
          budget.expense = 0;
          budget.total = req.body.amount;
        }
         if (req.body.amountType == "expense") {
          
          budget.expense = req.body.amount;
          budget.earning = 0;
          budget.total = 0 - req.body.amount;
        }
       
  
        const savebudget = await budget.save();
        res.send({  savebudget });
    
    }
      }else {
        res.send("Please Select Type");
      }
    }
   
   catch (error) {
    res.status(400).send(error);
  }
};

const getBudget = async (req, res) => {
  const _id = req.user._id.toString();

  try {
    const budget = await Budget.find();
    const UserBudget = budget.filter((b) => _id == b.User.toString());

    let TotalBudget = 0;

    for (let index = 0; index < UserBudget.length; index++) {
      TotalBudget += UserBudget[index].total;
    }
    let TotalEarnings = 0;

    for (let index = 0; index < UserBudget.length; index++) {
      TotalEarnings += UserBudget[index].earning;
    }
    let TotalExpense = 0;
    for (let index = 0; index < UserBudget.length; index++) {
      TotalExpense += UserBudget[index].expense;
    }
    console.log(TotalExpense);

    res.send({ TotalBudget, TotalEarnings, TotalExpense, UserBudget });
  } catch (error) {
    res.status(400).send(error);
  }
};
const updateBudget = async (req, res) => {
  try {
    const uid = req.user._id.toString();
    const _id = req.params.id;
    const budget = await Budget.find();
    const response = budget.filter((b) => uid == b.User.toString());
    const response1 = response.filter((r) => _id == r._id.toString());

    if (response1.length == 0) {
      res.send("404 Not Found");
    }
    const bud = await Budget.findByIdAndUpdate(response1[0]._id);

    bud.name = req.body.name;
    if (req.body.amountType == "earning" || req.body.amountType == "expense") {
    if (req.body.amountType == "earning") {
      bud.amount = req.body.amount;
      bud.earning = req.body.amount;
      bud.expense=0
      bud.total = req.body.amount;
    } 
     if (req.body.amountType == "expense") {
      bud.amount = req.body.amount;
      bud.expense = req.body.amount;
      bud.earning=0
      bud.total = req.body.amount;
    } 

    const savebudget = await bud.save();
    res.send({ savebudget });}
    else {
      res.send("Please Select Type");
    }

  } catch (error) {
    res.status(401);
  }
};

const deleteBudget = async (req, res) => {
  try {
    const uid = req.user._id.toString();
    const _id = req.params.id;
    const budget = await Budget.find();
    const response = budget.filter((b) => uid == b.User.toString());
    const response1 = response.filter((r) => _id == r._id.toString());

    if (response1.length == 0) {
      res.send("404 Not Found");
    }
    const bud = await Budget.findByIdAndDelete(response1[0]._id);

    res.send(bud);
  } catch (error) {
    res.status(401);
  }
};
module.exports = { postBudget, updateBudget, getBudget, deleteBudget };