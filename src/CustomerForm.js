import React, { useState } from "react";

export const CustomerForm = ({ original, onSubmit }) => {
  const [customer, setCustomer] = useState(original);
  const handleChangeFirstName = ({ target }) => {
    setCustomer((customer) => ({
      ...customer,
      firstName: target.value,
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
          onChange={handleChangeFirstName}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};
