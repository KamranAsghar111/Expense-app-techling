
const Budget = require("../models/Budget");
const postBudget = async (req, res) => {
    
  
  try {
  const budget = Budget({
    ...req.body,
    User:req.user._id
  } 
  );
  let {amount} = budget
  budget.earning=amount
  budget.total=budget.earning
  
  const earningObj={
    name:req.body.name,
    earning:req.body.amount
  }
  budget.earningDetail.push(earningObj)
  const savebudget = await budget.save();
  res.send({savebudget}); 
} catch (error) {
  res.status(401).send(error);
}
 
};


const getBudget = async (req, res) => {
    // const owner = req.user._id;
    const _id = req.params.id;
    try {
      const budget = await Budget.findOne({_id});
      res.send(budget)
    } catch (error) {
      res.status(401).send();
    }
  }

  
const updateBudget = async (req, res) => {
  try {
    const _id = req.params.id;
    const budget = await Budget.findByIdAndUpdate(_id, req.body.amount);
    
    const amount=req.body.amount
    const amountType=req.body.amountType
     
    if(amountType=="earning"){
      budget.amount=amount;
      budget.total+=amount;
      budget.earning+=amount
      const earningObject={
        name:req.body.name,
        earning:req.body.amount
      }
      budget.earningDetail.push(earningObject)
    } 
   
     if (amountType=="expense") {
      if(budget.total >= amount){    
      budget.total-=amount;
      budget.amount=amount;
      budget.expense+=amount
      const expenseObject={
        name:req.body.name,
        expense:req.body.amount
      }
      budget.expenseDetail.push(expenseObject)
    }else{
      res.send("balance low")
    }
 
     }
 
  const savebudget = await budget.save();
  res.send({savebudget}); 
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = { postBudget, updateBudget,getBudget};
