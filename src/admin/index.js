
import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "assets/css/animate.min.css";
import "assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "admin/layouts/Admin.js";

export default function Admin() {
  return (
    <>
      <Route path="/" render={(props) => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </>
  )
}