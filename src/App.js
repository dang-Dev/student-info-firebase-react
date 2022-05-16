import React from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppBar from "./Components/AppBar";

import Home from "./Components/Home";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import SignIn from "./Auth/SignIn";
import { RequireAuth } from "./Auth/RequireAuth";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./styles.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ height: "100vh" }}>
          <UserAuthContextProvider>
            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              <Route
                exact
                path="/"
                element={
                  <>
                    <RequireAuth>
                      <AppBar />
                      <Home />
                    </RequireAuth>
                  </>
                }
              />
            </Routes>
          </UserAuthContextProvider>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
