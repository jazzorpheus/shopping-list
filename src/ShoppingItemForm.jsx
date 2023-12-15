/* eslint-disable react/prop-types */
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
import InputLabel from "@mui/material/InputLabel";

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
    formData = { name: "", price: "", qty: "", category: formData.category };
    reset(formData);
  };

  const registerOptions = {
    name: { required: "Product name cannot be blank" },
    price: {
      // required: "A price is required",
      pattern: {
        value: /^\d*\.?\d+$/,
        message: "Must be of the form x.x, E.g. 1.67",
      },
    },
    qty: {
      // required: "An item quantity is required",
      pattern: {
        value: /^\d+$/,
        message: "Must be a number 1-10",
      },
      min: {
        value: 1,
        message: "Quantity must be 1 or more",
      },
      max: {
        value: 99,
        message: "Quantity must be no greater than 99",
      },
      defaultValue: 1,
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
          <InputLabel id="simple-select-label">Category</InputLabel>
          <Select
            id="simple-select"
            labelId="simple-select-label"
            label="Category"
            defaultValue={"Fruit & Veg"}
            name="category"
            {...register("category")}
          >
            <MenuItem value={"Beverages"}>Beverages</MenuItem>
            <MenuItem value={"Condiments"}>Condiments</MenuItem>
            <MenuItem value={"Dairy"}>Dairy</MenuItem>
            <MenuItem value={"Frozen Food"}>Frozen Food</MenuItem>
            <MenuItem value={"Fruit & Veg"}>Fruit & Veg</MenuItem>
            <MenuItem value={"Grains"}>Grains</MenuItem>
            <MenuItem value={"Household Supplies"}>Household Supplies</MenuItem>
            <MenuItem value={"Meat & Fish"}>Meat & Fish</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button sx={{ minWidth: 230 }} variant="contained" type="submit">
        Add Item
      </Button>
    </form>
  );
}
