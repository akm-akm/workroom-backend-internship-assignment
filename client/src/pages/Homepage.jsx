import * as React from "react";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import BasicCard from "../components/User";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function DataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("home");
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axios.get("/user", {
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        });
        isMounted && setData(response.data.data);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
    return () => {
      isMounted = false;
       controller.abort();
    };
  }, []);

  return (
    <Container component="main" maxWidth="s">
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
          All Users
        </Typography>
        {data?.length ? (
          data.map((user) => <BasicCard key={user._id} user={user} />)
        ) : (
          <p>loading</p>
        )}
      </Box>
    </Container>
  );
}
