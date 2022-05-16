import React, { useState } from "react";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TableView from "./TableView";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Divider from "@mui/material/Divider";
import NewStudentView from "./NewStudentView";
import CloseIcon from "@mui/icons-material/Close";
import {
    addDoc,
    collection,
    serverTimestamp,
  } from "firebase/firestore";
  import { db } from "../firebase_conf";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 0,
}));

const Home = () => {
  const [isAdd, setIsAdd] = useState(false);

  const handleNewStudent = () => {
    setIsAdd(!isAdd);
  };

  /* CREATE */
  const createStudent = async (data) => {
    addDoc(collection(db, "students"), {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      middleName: data.get("middleName"),
      birthDate: data.get("birthDate"),
      address: data.get("address"),
      contactNumber: data.get("contact_number"),
      createdAt: serverTimestamp(),
    });
    setIsAdd(!isAdd);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: "#cfe8fc", height: "89vh" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={6} lg={6}>
              <Item
                sx={{ height: "25vh", display: "grid", placeItems: "center" }}
              >
                <Typography variant={"h2"}>Hi, WELCOME</Typography>
              </Item>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Item
                sx={{ height: "25vh", display: "grid", placeItems: "center" }}
              >
                {isAdd ? (
                  <Button
                    variant="outlined"
                    size="large"
                    color="error"
                    onClick={handleNewStudent}
                    startIcon={<CloseIcon />}
                  >
                    Close Form
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<AddBoxIcon />}
                    onClick={handleNewStudent}
                  >
                    New Student Info
                  </Button>
                )}
              </Item>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Item sx={{ height: "64vh" }}>
                {isAdd ? (
                  <>
                    <Divider variant="middle" />
                    <NewStudentView handleCreateStudent={createStudent} />
                  </>
                ) : (
                  <TableView />
                )}
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
