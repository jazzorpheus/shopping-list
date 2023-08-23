// NOTE: commented-out code was from before implementing react-hook-form

// React Hooks
import { useForm } from "react-hook-form";

// My Styles
import "./ShoppingItemForm.css";

// MUI Components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function ShoppingItemForm({ add }) {
  // const [formData, setFormData] = useState({ name: "", price: "", qty: "" });

  //   React Hook Form Settings
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  // const handleError = (errors) => {};

  const onSubmit = (formData) => {
    add(formData);
    formData = { name: "", price: "", qty: "" };
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
  };

  // const handleChange = (event) => {
  //   setFormData((currData) => {
  //     return {
  //       ...currData,
  //       [event.target.name]: event.target.value,
  //     };
  //   });
  // };

  // const submitForm = (event) => {
  //   event.preventDefault();
  //   add(formData);
  //   setFormData({ name: "", price: "", qty: "" });
  // };

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
        // value={formData.name}
        // onChange={handleChange}
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
        // value={formData.price}
        // onChange={handleChange}
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
        // value={formData.qty}
        // onChange={handleChange}
        {...register("qty", registerOptions.qty)}
      />
      <small>{errors?.qty && errors.qty.message}</small>

      <Button variant="contained" type="submit">
        Add Item
      </Button>
    </form>
  );
}
