// React Hooks
import { useState, useEffect } from "react";

// My Components
import ShoppingItemForm from "./ShoppingItemForm";
import CategoryList from "./CategoryList";

// My Styles
import "./ShoppingList.css";

// MUI Components
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 5,
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   alignItems: "center",
// };

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
  const [open, setOpen] = useState(false);

  // Open modal to confirm clear all items
  const handleOpen = () => setOpen(true);
  // Close modal
  const handleClose = () => setOpen(false);
  // Clear all items
  const reset = () => {
    setItems([]);
    handleClose();
  };

  // Save shopping items to localStorage every time items State changes
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // Create array of unique categories for rendering categoryList(s)
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
      setGrandTotal(null);
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
          qty: parseInt(newItem.qty) || 1,
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
        <Button
          className="Button Clear"
          variant="outlined"
          // ************************************************     OPEN MODAL
          onClick={handleOpen}
        >
          CLEAR ALL
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="Modal">
          <Typography
            sx={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Are you sure? All shopping items will be deleted.
          </Typography>
          <Button
            sx={{ marginTop: 2 }}
            className="Button Clear"
            variant="outlined"
            onClick={reset}
          >
            Confirm Delete
          </Button>
        </Box>
      </Modal>

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
      <hr style={{ marginBottom: "2rem" }} />
      {grandTotal && (
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
