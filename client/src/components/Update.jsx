import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Modal from "@mui/material/Modal";

function Update({ user }) {
  const history = useHistory();
  const context = React.useContext(AuthContext);

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    game: "",
    about: "",
    language: "",
    country: "",
  });

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(value);
    const key = Object.keys(value);
    key.forEach((k) => {
      if (value[k] === "") {
        delete value[k];
      }
    });
    updateUser();
  };
  const updateUser = async () => {
    try {
      const response = await axios.post(
        `/user/${user._id}`,
        JSON.stringify(value),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(JSON.stringify(response?.data));

      history.push("/");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        window.alert(err.response.data.error);

        setErrMsg("Bad request");
      } else {
        setErrMsg("error");
      }
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  value={value.name}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  value={value.email}
                  fullWidth
                  id="email"
                  onChange={handleChange}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="gender"
                  value={value.gender}
                  id="gender"
                  label="gender"
                  placeholder="M/F/O"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="about"
                  fullWidth
                  value={value.about}
                  onChange={handleChange}
                  id="about"
                  label="about"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="country"
                  value={value.country}
                  onChange={handleChange}
                  id="country"
                  fullWidth
                  label="country"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="game"
                  value={value.game}
                  fullWidth
                  onChange={handleChange}
                  id="game"
                  label="Favourite game"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="dob"
                  value={value.dob}
                  onChange={handleChange}
                  id="dob"
                  required
                  fullWidth
                  placeholder="YYYY/MM/DD"
                  label="Date of Birth"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  value={value.password}
                  onChange={handleChange}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              // disabled={!loading && open}

              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}

export default Update;
