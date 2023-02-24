import React from "react";
import ReactDOM from "react-dom/client";
import { AppointmentsDayView } from "./Appointment";
import { sampleAppointments } from "../test/sampleData";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppointmentsDayView appointments={sampleAppointments} />
);
