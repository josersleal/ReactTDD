import React, { useState } from "react";

export const CustomerForm = ({ original, onSubmit }) => {
  const [customer, setCustomer] = useState(original);

  /* const handleChangeFirstName = ({ target }) => {
    setCustomer((customer) => ({
      ...customer,
      firstName: target.value,
    }));
  }; */

  const handleChange = ({ target }) => {
    console.log("@handleChange original", original);

    console.log("@handleChange target.name", target.name);
    console.log("@handleChange target.value", target.value);
    setCustomer((customer) => ({
      ...customer,
      [target.name]: target.value,
    }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(customer);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={customer.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={customer.lastName}
          onChange={handleChange}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={customer.phoneNumber}
          onChange={handleChange}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};
