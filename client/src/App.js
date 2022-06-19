import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Register from "./pages/Register";

import FloatingActionButton from "./components/FloatingActionButtons";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/protectedRoute";
import AuthRoute from "./utils/authRoute";
function App() {
  return (
    <AuthProvider>
      <Router>
        <FloatingActionButton />

        <Switch>
          <ProtectedRoute exact path="/" component={Homepage} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
