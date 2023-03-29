import React, {useState, useEffect} from 'react'
import {nanoid} from 'nanoid'
import GroceriesForm from './GroceriesForm'
import GroceriesList from './GroceriesList'
import BudgetCalculation from './BudgetCalculation'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {errorPopup, successPopup} from './Popup'


const GroceriesApp = () => {
    const [groceryName, setGroceryName] = useState('')
    const [groceryQty, setGroceryQty] = useState(1)
    const [groceryPrice, setGroceryPrice] = useState(0)
    const [editItemId, setEditItemId] = useState(null)
    const [storedGroceries, setStoredGroceries] = useState(() => {
        const localData = localStorage.getItem('groceries');
        return localData ? JSON.parse(localData) : [];
    })
    const [isEditing, setIsEditing] = useState(false) 

    const handleNegativePrice = () => {
        if (groceryPrice < 0) {
            return Math.abs(groceryPrice)
        } else {
            return groceryPrice
        }
    }

    const handleSubmit = () => {
        if (groceryName && groceryQty && groceryPrice && isEditing) {
            setStoredGroceries(
                storedGroceries.map((elem) => {
                    if (elem.id === editItemId) {
                        return {...elem, name: groceryName, qty: groceryQty, price: handleNegativePrice()}
                    }
                    return elem;
                })
            )
            setGroceryName('')
            setGroceryQty(1)
            setGroceryPrice(0)
            setIsEditing(false)
            successPopup('Grocery successfully edited.')
            
        } else if (groceryName && groceryQty && groceryPrice && !isEditing) {
            let newGrocery = {
                id: nanoid(),
                name: groceryName,
                qty: groceryQty,
                price: handleNegativePrice(),
            }
            setStoredGroceries([...storedGroceries, newGrocery])
            setGroceryName('')
            setGroceryQty(1)
            setGroceryPrice(0)
            successPopup('Grocery successfully added.')
        } else {
            errorPopup('Please fill all the fields.')
        }
    }

    useEffect(() => {
        localStorage.setItem('groceries', JSON.stringify(storedGroceries))
    }, [storedGroceries])


return (
    <>
        {storedGroceries.length > 0 &&
            <BudgetCalculation 
                storedGroceries={storedGroceries} 
                errorPopup={errorPopup}
            />
        }
        <section className="main">
            <GroceriesForm 
                setGroceryName={setGroceryName}
                setGroceryQty={setGroceryQty}
                groceryPrice={groceryPrice}
                setGroceryPrice={setGroceryPrice}
                handleSubmit={handleSubmit}
                groceryName={groceryName}
                groceryQty={groceryQty}
                isEditing={isEditing}
            />
            <GroceriesList 
                storedGroceries={storedGroceries}
                setStoredGroceries={setStoredGroceries}
                setIsEditing={setIsEditing}
                setGroceryName={setGroceryName}
                setGroceryQty={setGroceryQty}
                setGroceryPrice={setGroceryPrice}
                setEditItemId={setEditItemId}
                successPopup={successPopup}
            />
        </section>
        <ToastContainer />
        
    </>
  )
}

export default GroceriesApp