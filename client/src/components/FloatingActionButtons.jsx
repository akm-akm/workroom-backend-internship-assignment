import * as React from "react";
import Fab from "@mui/material/Fab";
import { AuthContext } from "../context/AuthContext";

export default function FloatingActionButtons() {
  const { user, logout } = React.useContext(AuthContext);
  console.log(user);
  const exit = () => {
    logout();
  };
  return user ? (
    <Fab
      onClick={exit}
      variant="extended"
      style={{
        position: "fixed",
        width: "200px",
        bottom: "0",
        right: "0",
        margin: "35px",
      }}
    >
      {user.name} Log out
    </Fab>
  ) : null;
}
