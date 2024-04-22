import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import Unauthorize from "./components/Unauthorize";
import Linkage from "./components/Linkage";
import Home from "./components/Home";
import Lounge from "./components/Lounge";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

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
