import React, { useState } from "react";

const appointmentTimeOfDay = (startsAt) => {
  const [h, m] = new Date(startsAt).toTimeString().split(":");
  return `${h}:${m}`;
  // return '${h}:${m}'
};

export const Appointment = ({ customer, service, notes, startsAt }) => {
  console.log("logged: ", customer);
  console.log("logged: ", service);

  return (
    <div>
      <div id="appointmentView">
        <h3>Today’s appointment at {appointmentTimeOfDay(startsAt)}</h3>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Stylist</th>
              <th>Service</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.stylist}</td>
              <td>{service}</td>
              <td>{notes}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const AppointmentsDayView = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);

  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((a, i) => (
          <li key={a.startsAt}>
            <button
              type="button"
              className={selectedAppointment === i ? "toggled" : ""}
              onClick={() => setSelectedAppointment(i)}
            >
              {appointmentTimeOfDay(a.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>
      ) : (
        <Appointment {...appointments[selectedAppointment]} />
      )}
    </div>
  );
};
