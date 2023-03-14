import React from "react";
import ReactDOM from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentsDayView";
import { sampleAppointments } from "../test/sampleData";
import { CustomerForm } from "./CustomerForm";
const blankCustomer = {
  firstName: "pup",
  lastName: "bip",
  phoneNumber: "1212121",
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <CustomerForm original={ blankCustomer } />
);
/* ReactDOM.createRoot(document.getElementById("root")).render(
  <AppointmentsDayView appointments={sampleAppointments} />
);
 */