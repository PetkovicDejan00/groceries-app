import React, {useState, useEffect} from 'react'

const BudgetCalculation = ({ storedGroceries, errorPopup }) => {
  const [budget, setBudget] = useState(0)
  const [budgetLeft, setBudgetLeft] = useState(0)
  const [budgetCalculated, setBudgetCalculated] = useState(false)
  const [message, setMessage] = useState('')

  const price = Object.values(storedGroceries.map(grocery => grocery.price))
  const qty = Object.values(storedGroceries.map(grocery => grocery.qty))

  const valuesObj = {
    prices: price,
    qtys: qty
  }

  let pricesArray = []
  let totalPrice = 0;
  
  for (let i = 0; i < price.length; i++) {
    pricesArray.push(valuesObj.prices[i] * valuesObj.qtys[i])
    totalPrice += pricesArray[i]
  }

  const handleBudgetCalculate = () => {
    if (budget) {
      setBudgetLeft(budget - totalPrice)
      setBudgetCalculated(true)
    } else {
      errorPopup('You must enter your budget first.')
  }
}

  useEffect(() => {
    {budgetLeft >= 0 
      ? setMessage(`Budget left will be ${budgetLeft.toFixed(1)}$.`)
      : setMessage(`No enough money. You need to add ${Math.abs(budgetLeft.toFixed(1))}$ more to your budget in order to buy wanted groceries.`)
    }
  }, [budgetLeft])


  return (
      <div className="budget-calc">
        <p>
          {budgetCalculated ? message : 'Calculate your budget'}
        </p>
        <input 
          type="number" 
          name="budget-calculate"
          placeholder="(e.g. 50)"
          onChange={(e) => setBudget(e.target.value)}
        />
        <button onClick={handleBudgetCalculate}>Calculate</button>
      </div>
  )
}

export default BudgetCalculation