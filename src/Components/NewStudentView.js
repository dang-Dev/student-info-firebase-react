import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";


const NewStudentView = (props) => {
    const { handleCreateStudent } = props
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleCreateStudent(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 0, p: 2 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4} md={6} lg={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
          />
        </Grid>
        <Grid item xs={4} md={6} lg={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="text"
            id="lastName"
            autoComplete="lastName"
          />
        </Grid>
        <Grid item xs={4} md={6} lg={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="middleName"
            label="Middle Name"
            type="text"
            id="middleName"
            autoComplete="middleName"
          />
        </Grid>
        <Grid item xs={4} md={6} lg={6}>
          <Typography>Birth Date:</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="birthDate"
            type="date"
            id="birthDate"
          />
        </Grid>
        <Grid item xs={4} md={6} lg={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            type="text"
            id="address"
            autoComplete="address"
          />
        </Grid>
        <Grid item xs={4} md={6} lg={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="contact_number"
            label="Contact Number"
            type="text"
            id="contact_number"
            autoComplete="contact_number"
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" size={"large"} sx={{ mt: 3 }}>
        Save Student
      </Button>
    </Box>
  );
};

export default NewStudentView;
