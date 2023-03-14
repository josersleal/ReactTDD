import React from "react";
import {
  initializeReactContainer,
  render,
  element,
  form,
  fieldOnForm,
  click,
  submit,
  submitButton,
  change,
} from "./reactTestExtensions";
import { toContainText } from "./matchers/toContaintext";
import { CustomerForm } from "../src/CustomerForm";

describe("CustomerForm", () => {
  const blankCustomer = { firstName: "", lastName: "" };
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(form()).not.toBeNull();
  });

  it("renders a submit button", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(submitButton()).not.toBeNull();
  });

  const itRendersAsATextBox = (fieldName) => {
    it("renders as a text box", () => {
      render(<CustomerForm original={blankCustomer} />);
      // const field = form().elements.firstName;
      const fieldFN = fieldOnForm(fieldName);

      expect(fieldFN).not.toBeNull();
      expect(fieldFN.tagName).toEqual("INPUT");
      expect(fieldFN.type).toEqual("text");
    });
  };

  const itIncludesTheExistingValue = (fieldName, existingValue) => {
    it("renders value in text box", () => {
      const customer = { [fieldName]: existingValue };
      render(<CustomerForm original={customer} />);

      const fieldValue = fieldOnForm(fieldName).value;

      expect(fieldValue).toEqual(existingValue);
    });
  };

  const itRendersALabel = (fieldForName, content) => {
    console.log(fieldForName);
    it(`renders ${content} as the label ${fieldForName} content`, () => {
      render(<CustomerForm original={blankCustomer} />);

      const label = element(`label[for=${fieldForName}]`);

      expect(label).toContainText(content);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) => {
    it("assigns an id that matches the label id", () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(fieldOnForm(fieldName).id).toEqual(fieldName);
    });
  };

  const itSubmitsExistingValue = (fieldName, fieldValue) => {
    it("saves existing value when submitted", () => {
      expect.hasAssertions();

      const customer = { [fieldName]: fieldValue };
      render(
        <CustomerForm
          original={customer}
          onSubmit={(props) => expect(props[fieldName]).toEqual(fieldValue)}
        />
      );

      const button = element("input[type=submit]");
      click(button);
    });
  };

  const itSubmitsNewValue = (fieldName, fieldValue) => {
    it("Then saves new value when submitted", () => {
      expect.hasAssertions();
      const customer = { [fieldName]: "oldValue" };

      render(
        <CustomerForm
          original={customer}
          onSubmit={(props) => expect(props[fieldName]).toEqual(fieldValue)}
        />
      );
      change(fieldOnForm(fieldName), fieldValue);
      click(submitButton());
    });
  };

  describe("First Name Field", () => {
    itRendersAsATextBox("firstName");
    itIncludesTheExistingValue("firstName", "Ashley");
    itRendersALabel("firstName", "First Name");
    itAssignsAnIdThatMatchesTheLabelId("firstName");
    itSubmitsExistingValue("firstName", "Ashley");
    itSubmitsNewValue("firstName", "newValue");
  });

  describe("last Name Field", () => {
    itRendersAsATextBox("lastName");
    itIncludesTheExistingValue("lastName", "Smith");
    itRendersALabel("lastName", "Last Name");
    itAssignsAnIdThatMatchesTheLabelId("lastName");
    itSubmitsExistingValue("lastName", "Smith");
    itSubmitsNewValue("lastName", "newValue");
  });

  describe("Given a phone number Field", () => {
    itRendersAsATextBox("phoneNumber");
    itIncludesTheExistingValue("phoneNumber", "01234");
    itRendersALabel("phoneNumber", "Phone Number");
    itAssignsAnIdThatMatchesTheLabelId("phoneNumber");
    itSubmitsExistingValue("phoneNumber", "12345");
    itSubmitsNewValue("phoneNumber", "99999");
  });

  it("prevents the default action when submitting the form", () => {
    render(<CustomerForm original={blankCustomer} onSubmit={() => {}} />);

    const event = submit(form());

    expect(event.defaultPrevented).toBe(true);
  });
});
