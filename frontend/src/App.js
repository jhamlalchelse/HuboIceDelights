import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/User/Signup";
import Layout from "./pages/Layout";
import Unauthorize from "./components/Unauthorize";
import Linkage from "./pages/Linkage";
import Home from "./pages/Home";
import Lounge from "./pages/Lounge";
import Editor from "./pages/Editor";
import Admin from "./pages/Admin";
import Missing from "./pages/Missing";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Login from "./pages/User/Login";

const ROLES = {
  User: 2001,
  Editor: 1985,
  Admin: 5150,
};
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Route */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="linkage" element={<Linkage />} />
          <Route path="unauthorize" element={<Unauthorize />} />
          {/* Private Route */}
          <Route element={<PersistLogin />}>
            <Route
              element={
                <RequireAuth
                  allowRoles={[ROLES.Admin, ROLES.Editor, ROLES.User]}
                />
              }
            >
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<RequireAuth allowRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route
              element={<RequireAuth allowRoles={[ROLES.Admin, ROLES.Editor]} />}
            >
              <Route path="editor" element={<Editor />} />
            </Route>
            <Route
              element={
                <RequireAuth
                  allowRoles={[ROLES.Admin, ROLES.Editor, ROLES.User]}
                />
              }
            >
              <Route path="lounge" element={<Lounge />} />
            </Route>
          </Route>
          {/* Catch all path */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
