const Budget = require("../models/Budget");
const postBudget = async (req, res) => {
  try {
    const budget = Budget({
      ...req.body,
      User: req.user._id,
    });
    let { amount } = budget;
    budget.earning = amount;
    budget.total = budget.earning;

    const earningObj = {
      name: req.body.name,
      earning: req.body.amount,
    };
    budget.earningDetail.push(earningObj);
    const savebudget = await budget.save();
    res.send({ savebudget });
  } catch (error) {
    res.status(401).send(error);
  }
};

const getBudget = async (req, res) => {
  const _id = req.params.id;
  try {
    const budget = await Budget.findOne({ _id });
    const user = req.user._id;
    const authuser = budget.User;

    
    if (user.toString() == authuser.toString()) {
      res.send(budget);
    } else {
      res.send("User is not authorized");
    }
  } catch (error) {
    res.status(401).send();
  }
};

// const getBudgetDetail = async (req, res) => {

//   const _id = req.params.id;
//   const BudgetType=req.params.earning
//   try {
//     const budget = await Budget.findOne({_id});
//     if(BudgetType=="earning"){
//       res.send(budget.earningDetail)
//     }
//     if(BudgetType=="expense"){
//       res.send(budget.expenseDetail)
//     }
//     res.send(budget)
//   } catch (error) {
//     res.status(401).send();
//   }
// }

const updateBudget = async (req, res) => {
  try {
    const _id = req.params.id;
    const budget = await Budget.findByIdAndUpdate(_id, req.body.amount);
    const user = req.user._id;
    const authuser = budget.User;
    const amount = req.body.amount;
    const amountType = req.body.amountType;
    if (user.toString() == authuser.toString()) {
      if (amountType == "earning") {
        budget.amount = amount;
        budget.total += amount;
        budget.earning += amount;
        const earningObject = {
          name: req.body.name,
          earning: req.body.amount,
        };
        budget.earningDetail.push(earningObject);
      }

      if (amountType == "expense") {
        if (budget.total >= amount) {
          budget.total -= amount;
          budget.amount = amount;
          budget.expense += amount;
          const expenseObject = {
            name: req.body.name,
            expense: req.body.amount,
          };
          budget.expenseDetail.push(expenseObject);
        } else {
          res.send("balance low");
        }
      }

      const savebudget = await budget.save();
      res.send({ savebudget });
    } else {
      res.send("user is not authorized");
    }
  } catch (error) {
    res.status(401);
  }
};

module.exports = { postBudget, updateBudget, getBudget };
