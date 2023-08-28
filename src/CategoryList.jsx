// React Hooks
import { useState } from "react";

// My components
import ShoppingListHeading from "./ShoppingListHeading";
import ShoppingItem from "./ShoppingItem";

// MUI components
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";

export default function CategoryList({ items, toggle, remove }) {
  // *************************************************** MUI NESTED LISTS
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen((currVal) => {
      return !currVal;
    });
  };
  return (
    items && (
      <Box>
        <ListItemButton onClick={handleClick} sx={{ py: 0 }}>
          <ListItemIcon sx={{ marginRight: 0 }}>
            <ChecklistIcon />
          </ListItemIcon>
          <ListItemText primary={<h2>{items[0].category}</h2>} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ShoppingListHeading />
          <List component="div" disablePadding>
            {items.map((item) => {
              return (
                <ShoppingItem
                  item={item}
                  toggle={toggle}
                  remove={remove}
                  key={item.id}
                />
              );
            })}
          </List>
        </Collapse>
      </Box>
    )
  );
}
