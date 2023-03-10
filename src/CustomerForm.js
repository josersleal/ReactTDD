import React, { useState } from "react";

export const CustomerForm = ({ original, onSubmit }) => {
  const [customer, setCustomer] = useState(original);
  const handleChangeFirstName = ({ target }) => {
    // console.log("target.value: ", target.value);

    setCustomer((customer) => ({
      ...customer,
      firstName: target.value,
    }));

    // console.log("customer.firstName: ", customer.firstName);
  };
  function handleSubmit(event) {
    event.preventDefault();
    // console.log("original.firstName: ", original.firstName);
    // console.log("customer.firstName: ", customer.firstName);
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
          onChange={handleChangeFirstName}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};
