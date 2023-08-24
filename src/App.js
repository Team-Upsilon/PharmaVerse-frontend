import "./App.css";
import Admin_Page from "./Component/Admin-Page";
import Supplier from "./Component/Supplier";
import Transporter from "./Component/Transporter";
import Inspector from "./Component/Inspector";
import Inventory from "./Component/Inventory";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./Miscellaneous/NavBar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Routes>
          <Route path="/admin" element={<Admin_Page />} exact />
          <Route
            path="/inventory"
            element={
              <>
                <Inventory />
              </>
            }
          />
          <Route
            path="/supplier"
            element={
              <>
                <Supplier />
              </>
            }
          />
           <Route
            path="/transporter"
            element={
              <>
                <Transporter/>
              </>
            }
          />
           <Route
            path="/inspector"
            element={
              <>
                <Inspector/>
              </>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
