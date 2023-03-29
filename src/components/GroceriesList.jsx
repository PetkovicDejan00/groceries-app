import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'
import {pen_1} from 'react-icons-kit/ikons/pen_1'

const GroceriesList = ({ 
    setStoredGroceries, 
    storedGroceries,
    setIsEditing,
    setGroceryName,
    setGroceryPrice,
    setGroceryQty,
    setEditItemId,
    successPopup
}) => {

    const handleGroceryDelete = (id) => {
        const filtered = storedGroceries.filter(grocery => grocery.id !== id);
        setStoredGroceries(filtered)
        successPopup('Grocery successfully deleted.')
    }

    const handleGroceryEdit = (id) => {
        let newGroceryEdit = storedGroceries.find(elem => elem.id === id)
        setGroceryName(newGroceryEdit.name)
        setGroceryQty(newGroceryEdit.qty)
        setGroceryPrice(newGroceryEdit.price)
        setIsEditing(true)
        setEditItemId(id)
    }

    const handleRemoveStoredGroceries = () => {
        setStoredGroceries([])
        successPopup('All groceries removed.')
    }

  return (
    <div className="groceryList">
        {storedGroceries.length > 0 ? 
            <>
            <h2>Groceries List</h2> 
            <div className="titles">
                <p>Name</p>
                <p>Quantity</p>
                <p>Price</p>
            </div>
            </>
            : <h2>Groceries list is empty</h2>}
        <div className="list">
        {storedGroceries && storedGroceries.map((grocery) => {
            return (
                <div className="grocery" key={grocery.id}>
                    <div className="grocery-info">
                        <p title="Name">{grocery.name}</p>
                        <p title="Quantity">{grocery.qty}</p>
                        <p title="Price">{grocery.price}$</p>
                    </div>
                    <div className="cta-buttons">
                        <Icon 
                            icon={pen_1}
                            className="button edit-btn" 
                            onClick={() => handleGroceryEdit(grocery.id)}
                            title="Edit">
                        </Icon>
                        <Icon 
                            icon={trash} 
                            onClick={() => handleGroceryDelete(grocery.id)} 
                            className="button delete-btn"
                            title="Delete">
                        </Icon>
                    </div>
                </div>
            )
        })}
        </div>
        {storedGroceries.length > 1 && 
            <button onClick={handleRemoveStoredGroceries} className="clear-all-button">Clear all</button>
        }
    </div>
  )
}

export default GroceriesList