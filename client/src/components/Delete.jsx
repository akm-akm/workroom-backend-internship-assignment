import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../api/axios";
import { IconButton } from "@mui/material";
function Delete({ _id, deleteUserHandler }) {
  const [errMsg, setErrMsg] = useState("");

  const handleDelete = () => {
    deleteUser();
  };
  const deleteUser = async () => {
    try {
      const response = await axios.delete(`/user/${_id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });
      console.log((response?.data));
      deleteUserHandler(_id);
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
    <IconButton>
      <DeleteIcon onClick={handleDelete} style={{ color: "red" }} />
    </IconButton>
  );
}

export default Delete;
