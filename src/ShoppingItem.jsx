// My Styles
import "./ShoppingItem.css";

// MUI Components
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ShoppingItem({ item, toggle, remove }) {
  // Link ListItemText components to Checkbox component
  const labelId = `checkbox-list-label-${item.id}`;

  return (
    <ListItem
      className="ListItem"
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={() => remove(item.id)}
        >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={() => toggle(item.id)} dense>
        <ListItemIcon>
          <Checkbox
            className="Checkbox"
            edge="start"
            checked={item.inBasket}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText
          disableTypography
          className="ListItemText product-name"
          id={labelId}
          primary={item.name}
        />
        <ListItemText
          disableTypography
          className="ListItemText"
          id={labelId}
          primary={item.price === 0 ? "-" : "£" + item.price.toFixed(2)}
        />
        <ListItemText
          disableTypography
          className="ListItemText"
          id={labelId}
          primary={item.qty}
        />
        <ListItemText
          disableTypography
          className="ListItemText"
          id={labelId}
          primary={
            item.price === 0 ? "-" : "£" + (item.price * item.qty).toFixed(2)
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
