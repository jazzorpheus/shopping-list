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
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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

  // Reset items State
  const resetList = () => {
    setItems([]);
  };

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

  // *************************************************** MUI NESTED LISTS
  const [open, setOpen] = useState(Array(5).fill(true));
  const handleClick = (id) => {
    setOpen((currVals) => {
      return currVals.map((val, i) => {
        if (i === id) {
          return !val;
        } else {
          return val;
        }
      });
    });
  };

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

      {/* *******************************************************    FRUIT & VEG */}
      {items.some((item) => item.category === "fruit&veg") && (
        <Box>
          <ListItemButton onClick={() => handleClick(0)} sx={{ py: 0 }}>
            <ListItemIcon sx={{ marginRight: 0 }}>
              <ChecklistIcon />
            </ListItemIcon>
            <ListItemText primary={<h2>Fruit & Veg</h2>} />
            {open[0] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open[0]} timeout="auto" unmountOnExit>
            <ShoppingListHeading />
            <List component="div" disablePadding>
              {items
                .filter((item) => item.category === "fruit&veg")
                .map((item) => {
                  return (
                    <ShoppingItem
                      item={item}
                      toggle={toggleShoppingItem}
                      remove={removeShoppingItem}
                      key={item.id}
                    />
                  );
                })}
            </List>
          </Collapse>
        </Box>
      )}
      {/* *******************************************************    MEAT & FISH */}
      {items.some((item) => item.category === "meat&fish") && (
        <Box>
          <ListItemButton onClick={() => handleClick(1)} sx={{ py: 0 }}>
            <ListItemIcon sx={{ marginRight: 0 }}>
              <ChecklistIcon />
            </ListItemIcon>
            <ListItemText primary={<h2>Meat & Fish</h2>} />
            {open[1] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open[1]} timeout="auto" unmountOnExit>
            <ShoppingListHeading />
            <List component="div" disablePadding>
              {items
                .filter((item) => item.category === "meat&fish")
                .map((item) => {
                  return (
                    <ShoppingItem
                      item={item}
                      toggle={toggleShoppingItem}
                      remove={removeShoppingItem}
                      key={item.id}
                    />
                  );
                })}
            </List>
          </Collapse>
        </Box>
      )}

      {/* *******************************************************    DAIRY */}
      {items.some((item) => item.category === "dairy") && (
        <Box>
          <ListItemButton onClick={() => handleClick(2)} sx={{ py: 0 }}>
            <ListItemIcon sx={{ marginRight: 0 }}>
              <ChecklistIcon />
            </ListItemIcon>
            <ListItemText primary={<h2>Dairy</h2>} />
            {open[2] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open[2]} timeout="auto" unmountOnExit>
            <ShoppingListHeading />
            <List component="div" disablePadding>
              {items
                .filter((item) => item.category === "dairy")
                .map((item) => {
                  return (
                    <ShoppingItem
                      item={item}
                      toggle={toggleShoppingItem}
                      remove={removeShoppingItem}
                      key={item.id}
                    />
                  );
                })}
            </List>
          </Collapse>
        </Box>
      )}
      {/* *******************************************************    OTHER */}
      {items.some((item) => item.category === "other") && (
        <Box>
          <ListItemButton onClick={() => handleClick(3)} sx={{ py: 0 }}>
            <ListItemIcon sx={{ marginRight: 0 }}>
              <ChecklistIcon />
            </ListItemIcon>
            <ListItemText primary={<h2>Other</h2>} />
            {open[3] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open[3]} timeout="auto" unmountOnExit>
            <ShoppingListHeading />
            <List component="div" disablePadding>
              {items
                .filter((item) => item.category === "other")
                .map((item) => {
                  return (
                    <ShoppingItem
                      item={item}
                      toggle={toggleShoppingItem}
                      remove={removeShoppingItem}
                      key={item.id}
                    />
                  );
                })}
            </List>
          </Collapse>
        </Box>
      )}
      <hr
        style={{ marginRight: "10vw", marginLeft: "10vw", marginTop: "1.5rem" }}
      />
      <hr style={{ marginRight: "10vw", marginLeft: "10vw" }} />
      {grandTotal > 0 && (
        <div className="grandTotal">
          <span style={{ marginRight: "20%" }}>GRAND TOTAL:</span> £{grandTotal}
        </div>
      )}
      <ShoppingItemForm add={addShoppingItem} />
    </List>
  );
}
