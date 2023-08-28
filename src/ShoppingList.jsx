// React Hooks
import { useState, useEffect } from "react";

// My Components
import ShoppingListHeading from "./ShoppingListHeading";
import ShoppingItem from "./ShoppingItem";
import ShoppingItemForm from "./ShoppingItemForm";

// Category List
import CategoryList from "./CategoryList";

// My Styles
import "./ShoppingList.css";

// MUI Components
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// Get any data saved in localStorage
const getInitialData = () => {
  const initData = JSON.parse(localStorage.getItem("items"));
  // If no data start with an empty array
  if (!initData) return [];
  return initData;
};

// *************************************************************************  SHOPPING LIST

export default function ShoppingList() {
  const [items, setItems] = useState(getInitialData);
  const [grandTotal, setGrandTotal] = useState(0);

  // Clear all items
  const resetList = () => {
    setItems([]);
  };

  // Save shopping items to localStorage every time items State changes
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // Create array of unique categories for rendering categoryList(s) dynamically
  const categories = Array.from(
    new Set(
      items.map((item) => {
        return item.category;
      })
    )
  );

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
          category: newItem.category,
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
    <List sx={{ padding: "0" }} className="List">
      {!items.length ? (
        <p>Add an item below</p>
      ) : (
        <Button className="Button Clear" variant="outlined" onClick={resetList}>
          CLEAR ALL
        </Button>
      )}

      {/* Render category lists from array of unique categories */}
      {categories.map((category) => {
        return (
          <CategoryList
            items={items.filter((item) => item.category === category)}
            toggle={toggleShoppingItem}
            remove={removeShoppingItem}
            key={category}
          />
        );
      })}

      <hr style={{ marginTop: "1.5rem" }} />
      <hr />
      {grandTotal > 0 && (
        <Container maxWidth="sm" className="grandTotal">
          <h3>
            GRAND TOTAL: <span>£{grandTotal}</span>
          </h3>
        </Container>
      )}
      <ShoppingItemForm add={addShoppingItem} />
    </List>
  );
}
