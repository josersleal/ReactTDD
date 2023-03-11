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
      const customer = { firstName: existingValue };

      render(<CustomerForm original={customer} />);

      expect(fieldOnForm(fieldName).value).toEqual(existingValue);
    });
  };

  const itRendersALabel = (fieldForName, content) => {
    it(`renders ${fieldForName} as the label`, () => {
      render(<CustomerForm original={blankCustomer} />);

      const label = element(`label[for=${fieldForName}]`);

      expect(label).toContainText(content);
    });
  };

  describe("First Name Field", () => {
    itRendersAsATextBox("firstName");
    itIncludesTheExistingValue("firstName", "Ashley");
    itRendersALabel("firstName", "First Name");

    it("saves existing value when submitted", () => {
      expect.hasAssertions();

      const customer = { firstName: "Ashley" };
      render(
        <CustomerForm
          original={customer}
          onSubmit={({ firstName }) => {
            // event.preventDefault();
            expect(firstName).toEqual("Ashley");
          }}
        />
      );

      const button = element("input[type=submit]");
      click(button);
    });

    it("saves new value when submitted", () => {
      expect.hasAssertions();
      const customer = { firstName: "Ashley" };

      render(
        <CustomerForm
          original={customer}
          onSubmit={({ firstName }) => {
            console.log("onSubmit: ", firstName);
            expect(firstName).toEqual("Jamie");
          }}
        />
      );
      change(fieldOnForm("firstName"), "Jamie");
      click(submitButton());
    });
  });

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(form()).not.toBeNull();
  });

  it("renders a submit button", () => {
    render(<CustomerForm original={blankCustomer} />);
    expect(submitButton()).not.toBeNull();
  });

  it("prevents the default action when submitting the form", () => {
    render(<CustomerForm original={blankCustomer} onSubmit={() => {}} />);

    const event = submit(form());

    expect(event.defaultPrevented).toBe(true);
  });
});
