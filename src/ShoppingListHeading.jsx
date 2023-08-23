// MUI Components
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

export default function ShoppingListHeading() {
  return (
    <div>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
        sx={{ display: "flex", justifyContent: "space-around", mb: "3vw" }}
      >
        <span style={{ paddingLeft: "6vw" }}>Product</span>
        <span>Price</span>
        <span>Qty</span>
        <span style={{ paddingRight: "8vw" }}>Total</span>
      </Stack>
    </div>
  );
}
