import React from "react";

export const CustomerForm = ({ original, onSubmit }) => {
  function handleSubmit() {
    return (event) => {
      event.preventDefault();
      onSubmit(original.firstName);
    };
  }
  return (
    <div>
      <form onSubmit={handleSubmit()}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={original.firstName}
          readOnly
        />
        <button type="submit" value="Add"></button>
      </form>
    </div>
  );
};
