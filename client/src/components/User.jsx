import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import Delete from "../components/Delete";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Modal from "@mui/material/Modal";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard({
  user,
  data,
  updateUserHandler,
  deleteUserHandler,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
  };

  const [value, setValue] = useState({
    ...data,
    password:"",
    dob: moment.utc(user.dob).format("YYYY/MM/DD"),
  });

  const [open, setOpen] = React.useState(false);
  const [opend, setOpend] = React.useState(false);
  const handleOpenu = () => {
    setOpen(true);
  };
  const handleOpend = () => setOpend(true);
  const handleCloseu = () => setOpen(false);
  const handleClosed = () => setOpend(false);

  const [del, setDel] = useState({
    gender: false,
    game: false,
    about: false,
    language: false,
    country: false,
  });
  const handleDeleteChange = (event) => {
    setDel({
      ...del,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const key = Object.keys(value);
    key.forEach((k) => {
      if (value[k] === "") {
        delete value[k];
      }
    });
    delete value.createdAt;
    delete value._id;
    updateUser();
  };

  const handleDelete = () => {
    const key = Object.keys(del);
    key.forEach((k) => {
      if (!del[k]) {
        delete del[k];
      }
    });
    deleteUser();
  };

  const deleteUser = async () => {
    try {
      const response = await axios.patch(
        `/user/${user._id}`,
        JSON.stringify(del),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(JSON.stringify(response?.data));
      handleClosed();
      updateUserHandler(response.data.data);
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
  const updateUser = async () => {
    try {
      const response = await axios.put(
        `/user/${user._id}`,
        JSON.stringify(value),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(response?.data.data);
      handleCloseu();
      updateUserHandler(response.data.data);
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
  return (
    <>
      <Card sx={{ minWidth: 275 , maxWidth:300, marginBottom:'10px' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {user.email}
          </Typography>
          <Typography variant="h5" component="div">
            {user.name}
          </Typography>
          <Typography variant="body2">
            {user.gender} {"|"} {moment.utc(user.dob).format("MM/DD/YYYY")}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {user.about}

          </Typography>
          <Typography variant="body2">
            {user.language} {"|"} {user.country} {"|"} {user.game}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={handleOpenu} size="small">
            Update data
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleOpend}
            size="small"
          >
            Delete data
          </Button>
          <Delete
            key={user._id}
            _id={user._id}
            deleteUserHandler={deleteUserHandler}
          />
        </CardActions>
      </Card>
      <Modal
        sx={style}
        open={opend}
        onClose={handleClosed}
        aria-labelledby="modal-delete"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "40px",
              backgroundColor: "white",
            }}
          >
            <Typography component="h1" variant="h5">
              Check the fields to be deleted
            </Typography>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={del.gender}
                      onChange={handleDeleteChange}
                      name="gender"
                    />
                  }
                  label="gender"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={del.about}
                      onChange={handleDeleteChange}
                      name="about"
                    />
                  }
                  label="about"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={del.game}
                      onChange={handleDeleteChange}
                      name="game"
                    />
                  }
                  label="game"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={del.language}
                      onChange={handleDeleteChange}
                      name="language"
                    />
                  }
                  label="language"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={del.country}
                      onChange={handleDeleteChange}
                      name="country"
                    />
                  }
                  label="country"
                />
              </FormGroup>
            </FormControl>
            <Button
              onClick={handleDelete}
              fullWidth
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Delete
            </Button>
            <Button
              type="submit"
              fullWidth
              onClick={handleClosed}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Discard
            </Button>
          </Box>
        </Container>
      </Modal>
      <Modal
        sx={style}
        open={open}
        onClose={handleCloseu}
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
              backgroundColor: "white",
            }}
          >
            <Typography component="h1" variant="h5">
              Only fill the fields you want to update
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Button
                type="submit"
                color="error"
                fullWidth
                onClick={handleCloseu}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Discard
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
