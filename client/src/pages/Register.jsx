import React, {  useState } from "react";

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

function Register() {
  const history = useHistory();
  const context = React.useContext(AuthContext);

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    cnfPassword: "",
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
    if (value.password !== value.cnfPassword) {
      window.alert("Password do not match!");
      return;
    }
    console.log(value);
    addUser();
  };
  const addUser = async () => {
    try {
      const response = await axios.post("/register", JSON.stringify(value), {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });
      console.log(JSON.stringify(response?.data));
      context.login(response.data.data);
      history.push("/");
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        window.alert(err.response.data.error);

        setErrMsg("Missing Username or Password");
      
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <>
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
                  name="language"
                  fullWidth
                  value={value.language}
                  onChange={handleChange}
                  id="language"
                  label="language"
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
              <Grid item xs={12}>
                <TextField
                  required
                  value={value.cnfPassword}
                  onChange={handleChange}
                  fullWidth
                  name="cnfPassword"
                  label="Confirm Password"
                  type="password"
                  id="cnfPassword"
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
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Register;
