import React from 'react'

const GroceriesForm = ({
    groceryName, 
    groceryQty, 
    setGroceryName, 
    setGroceryQty, 
    handleSubmit,
    groceryPrice,
    setGroceryPrice,
    isEditing,
}) => {
    
  return (
    <div className="form">
        {isEditing 
        ? <h2>Edit an existing grocery</h2>
        : <h2>Add a new grocery</h2>
        }
        <label htmlFor="name">Name:</label>
        <input
            onChange={(e) => setGroceryName(e.target.value)}
            id="name"
            type="text"
            name="name"
            placeholder="Grocery name"
            value={groceryName}
        />
        <label htmlFor="qty">Quantity:</label>
        <input 
            onChange={(e) => setGroceryQty(e.target.value)}
            id="qty"
            type="number"
            name="quantity"
            value={groceryQty}
        />
        <label htmlFor="price">Single grocery price:</label>
        <input 
            onChange={(e) => setGroceryPrice(e.target.value)}
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={groceryPrice}
        />
        {isEditing
            ? <button title="Edit" type="submit" onClick={handleSubmit}>Edit</button>
            : <button title="Submit" type="submit" onClick={handleSubmit}>Submit</button>
        }
    </div>
  )
}

export default GroceriesForm