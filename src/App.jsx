// CSS Stylesheet
import "./App.css";

// MUI Base Styling
import "@fontsource/roboto/700.css";

// My Components
import AppBar from "./AppBar";
import ShoppingList from "./ShoppingList";

import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar />
      <ShoppingList />
    </>
  );
}

export default App;
