import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../api/axios";
function Delete({ _id }) {
  const [errMsg, setErrMsg] = useState("");
    const values = {
      _id: "62aedc3094d559357a061df4",
    };
 // value._id = _id;
  const handleDelete = () => {
    deleteUser();
  };
  const deleteUser = async () => {
    try {
      console.log(_id,values);
      const response = await axios.delete(`/user`, JSON.stringify(values), {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });
      console.log(JSON.stringify(response?.data));
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
  return <DeleteIcon onClick={handleDelete} style={{ color: "red" }} />;
}

export default Delete;
