// React Hooks
import { useForm } from "react-hook-form";

// My Styles
import "./ShoppingItemForm.css";

// MUI Components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// MUI SELECT
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ShoppingItemForm({ add }) {
  //   React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  // const handleError = (errors) => {};

  const onSubmit = (formData) => {
    add(formData);
    formData = { name: "", price: "", qty: "", category: "other" };
    reset(formData);
  };

  const registerOptions = {
    name: { required: "Product name cannot be blank" },
    price: {
      // required: "A price is required",
      pattern: {
        value: /^\d+\.\d+$/i,
        message: "Must be of the form xx.xx, E.g. 2.00",
      },
    },
    qty: {
      required: "An item quantity is required",
      pattern: {
        value: /^\d+$/i,
        message: "Must be a number 1-99",
      },
      min: {
        value: 1,
        message: "Quantity must be greater than 0",
      },
      max: {
        value: 99,
        message: "Quantity must be less than 100",
      },
    },
    category: {
      required: true,
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="standard-basic"
        className="TextField Form"
        label="Product Name"
        placeholder="E.g. Apples"
        variant="standard"
        autoComplete="off"
        name="name"
        {...register("name", registerOptions.name)}
      />
      <small>{errors?.name && errors.name.message}</small>
      <TextField
        id="standard-basic"
        className="TextField Form"
        label="Price Per Item"
        placeholder="E.g. 0.99"
        variant="standard"
        autoComplete="off"
        name="price"
        {...register("price", registerOptions.price)}
      />
      <small>{errors?.price && errors.price.message}</small>
      <TextField
        id="standard-basic"
        className="TextField Form"
        label="Quantity"
        placeholder="E.g. 3"
        variant="standard"
        autoComplete="off"
        name="qty"
        {...register("qty", registerOptions.qty)}
      />
      <small>{errors?.qty && errors.qty.message}</small>

      {/* ******************************************************************  INPUT */}

      <Box sx={{ minWidth: 150, marginBottom: "2rem", marginTop: "1rem" }}>
        <FormControl fullWidth>
          <Select
            id="simple-select"
            label="Category"
            defaultValue={"other"}
            name="category"
            {...register("category")}
          >
            <MenuItem value={"produce"}>Fruit & Veg</MenuItem>
            <MenuItem value={"meat&fish"}>Meat & Fish</MenuItem>
            <MenuItem value={"dairy"}>Dairy</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button sx={{ minWidth: 230 }} variant="contained" type="submit">
        Add Item
      </Button>
    </form>
  );
}
