import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AuthContext } from "../context/AuthContext";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import BasicCard from "../components/User";

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
        //console.log(response.data.data);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      // controller.abort();
    };
  }, []);

  return (
    <Container component="main" maxWidth="s">
      {data?.length ? (
        data.map((user) => <BasicCard key={user._id} user={user} />)
      ) : (
        <p>loading</p>
      )}
    </Container>
  );
}
