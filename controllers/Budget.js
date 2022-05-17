
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
  
  const savebudget = await budget.save();
  res.send({savebudget}); 
} catch (error) {
  res.status(401).send(error);
}
 
};


const getBudget = async (req, res) => {
    const owner = req.user._id;
    try {
      const budget = await Budget.findOne({ owner });
      res.send(budget)
    } catch (error) {
      res.status(401).send();
    }
  }


const updateBudget = async (req, res) => {
  try {
    const _id = req.params.id;
    const budget = await Budget.findByIdAndUpdate(_id, req.body);
    //  let {amount,amountType}=budget
    const amount=req.body.amount
    const amountType=req.body.amountType
     console.log(amountType)
    if(amountType=="earning"){
      budget.total+=amount;
      budget.earning+=amount
    } 
   
     if (amountType=="expense") {
      if(budget.total>0){    
      budget.total-=amount;
      budget.expense+=amount
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

module.exports = { postBudget, updateBudget,getBudget };
