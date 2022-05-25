const Budget = require("../models/Budget");
const postBudget = async (req, res) => {
  try {
    const budget = Budget({
      ...req.body,
      User: req.user._id,
    });
  
    if(req.body.amountType == "earning"){
      budget.earning = req.body.amount;
       budget.expense=0;
      budget.total=req.body.amount
    }
    else if(req.body.amountType == "expense"){
       budget.expense = req.body.amount;
       budget.earning=0
       budget.total=0 - req.body.amount
    }
    else{
      res.send("Please Select Type");
    }
    
    const savebudget = await budget.save();
    res.send({ savebudget });
  } catch (error) {
    res.status(401).send(error);
  }
};

const getBudget = async (req, res) => {
  
  const _id =req.user._id.toString();
  
  try {
    const budget = await Budget.find();
    const UserBudget=  budget.filter(b=>_id== b.User.toString())
   
    let TotalBudget =0
    
    for (let index = 0; index < UserBudget.length; index++) {
      TotalBudget  += UserBudget[index].total;
      
    }
   let TotalEarnings = 0

   for (let index = 0; index < UserBudget.length; index++) {
      TotalEarnings += UserBudget[index].earning;
     
   }
   let TotalExpense= 0
   for (let index = 0; index < UserBudget.length; index++) {
      TotalExpense += UserBudget[index].expense;
     }
    console.log(TotalExpense);
    
     res.send({TotalBudget,TotalEarnings,TotalExpense,UserBudget});
    
   
    
  } catch (error) {
    res.status(400).send(error);
  }
};
const updateBudget = async (req, res) => {
  try {
    const uid=req.user._id.toString();
    const _id = req.params.id;
    const budget = await Budget.find();
    const response=  budget.filter(b=>uid== b.User.toString())
    const response1=response.filter(r=>_id== r._id.toString())
   
    

    if(response1.length==0){
      
      res.send("404 Not Found");
    }
    const bud = await Budget.findByIdAndUpdate(response1[0]._id);
   
   
    bud.name=req.body.name
    if(req.body.amountType == "earning"){
      bud.amount=req.body.amount;
      bud.earning=req.body.amount
      bud.total=req.body.amount
    }
    else if(req.body.amountType == "expense"){
       bud.amount=req.body.amount;
       bud.expense=req.body.amount
       bud.total= req.body.amount
    }
    else{
      res.send("Please Select Type");
    }
    
    const savebudget = await bud.save();
    res.send({ savebudget });
  
   
  } catch (error) {
    res.status(401);
  }
};

const deleteBudget = async (req, res) =>{
  try {
    const uid=req.user._id.toString();
    const _id = req.params.id;
    const budget = await Budget.find();
    const response=  budget.filter(b=>uid== b.User.toString())
    const response1=response.filter(r=>_id== r._id.toString())
   
    

    if(response1.length==0){
      
      res.send("404 Not Found");
    }
    const bud = await Budget.findByIdAndDelete(response1[0]._id);
   
   console.log(bud);
    
    res.send(bud)
  
   
  } catch (error) {
    res.status(401);
  }
}
module.exports = { postBudget, updateBudget, getBudget,deleteBudget };


// const earningDetail = async (req, res) => {
  //   const _id = req.params.id;
  //   try {
    //     const budget = await Budget.findOne({ _id });
//     const user = req.user._id;
//     const authuser = budget.User;

    
//     if (user.toString() == authuser.toString()) {
//       res.send(budget.earningDetail);
//     } else {
//       res.send("User is not authorized");
//     }
//   } catch (error) {
//     res.status(401).send(error);
//   }
// };



// const getBudgetDetail = async (req, res) => {

//   const _id = req.params.id;
//   const product=req.params.pid;
// console.log(product);
//   try {
//     console.log("connection");
//     const budget = await Budget.findOne({_id});
//     console.log(budget.earningDetail[0]._id.toString());
    
    
//     res.send("ok")
//   } catch (error) {
//     res.status(401).send("error");
//   }
// }

//Up old code
  // const user = req.user._id;
  // const authuser = budget.User;
  // const amount = req.body.amount;
  // const amountType = req.body.amountType;
  // if (user.toString() == authuser.toString()) {
  //   if (amountType == "earning") {
  //     budget.amount = amount;
  //     budget.total += amount;
  //     budget.earning += amount;
  //     const earningObject = {
  //       name: req.body.name,
  //       earning: req.body.amount,
  //     };
  //     budget.earningDetail.push(earningObject);
  //   }
  
  //   if (amountType == "expense") {
  //     if (budget.total >= amount) {
  //       budget.total -= amount;
  //       budget.amount = amount;
  //       budget.expense += amount;
  //       const expenseObject = {
  //         name: req.body.name,
  //         expense: req.body.amount,
  //       };
  //       budget.expenseDetail.push(expenseObject);
  //     } else {
  //       res.send("balance low");
  //     }
  //   }
  
  //   const savebudget = await budget.save();
  //   res.send({ savebudget });
  // } else {
  //   res.send("user is not authorized");
  // }