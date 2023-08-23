// React Hooks
import { useState, useEffect } from "react";

// My Components
import ShoppingListHeading from "./ShoppingListHeading";
import ShoppingItem from "./ShoppingItem";
import ShoppingItemForm from "./ShoppingItemForm";

// My Styles
import "./ShoppingList.css";

// MUI Components
import List from "@mui/material/List";

// Get any data saved in localStorage
const getInitialData = () => {
  const initData = JSON.parse(localStorage.getItem("items"));
  // If no data start with an empty array
  if (!initData) return [];
  return initData;
};

// *****************************************************************  SHOPPING LIST

export default function ShoppingList() {
  const [items, setItems] = useState(getInitialData);
  const [grandTotal, setGrandTotal] = useState(0);

  // Save shopping items to localStorage every time items State changes
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // Update grandTotal whenever items State changes
  useEffect(() => {
    if (items.length) {
      setGrandTotal(
        items
          .map((item) => item.price * item.qty)
          .reduce((acc, curr) => acc + curr)
          .toFixed(2)
      );
    } else {
      setGrandTotal(0);
    }
  }, [items]);

  // Add a ShoppingItem
  const addShoppingItem = (newItem) => {
    setItems((currItems) => {
      return [
        ...currItems,
        {
          name: newItem.name,
          price: parseFloat(newItem.price) || 0,
          qty: parseInt(newItem.qty),
          inBasket: false,
          id: crypto.randomUUID(),
        },
      ];
    });
  };

  // Tick off ShoppingItem
  const toggleShoppingItem = (id) => {
    setItems((currItems) => {
      return currItems.map((item) => {
        if (item.id === id) {
          return { ...item, inBasket: !item.inBasket };
        } else {
          return item;
        }
      });
    });
  };

  // Delete ShoppingItem
  const removeShoppingItem = (id) => {
    setItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  return (
    <List className="List">
      <ShoppingListHeading />
      {items.map((item) => {
        return (
          <ShoppingItem
            item={item}
            toggle={toggleShoppingItem}
            remove={removeShoppingItem}
            key={item.id}
          />
        );
      })}
      <br />
      <hr style={{ marginRight: "10vw", marginLeft: "10vw" }} />
      <div className="grandTotal">
        <span style={{ marginRight: "20%" }}>GRAND TOTAL:</span> £{grandTotal}
      </div>
      <ShoppingItemForm add={addShoppingItem} />
    </List>
  );
}
