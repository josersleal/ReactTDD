import React from "react";
import {
  initializeReactContainer,
  render,
  element,
  form,
  field,
  click,
  submit,
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

  it("renders the first name field as a text box", () => {
    render(<CustomerForm original={blankCustomer} />);
    // const field = form().elements.firstName;
    const fieldFN = field("firstName");

    expect(fieldFN).not.toBeNull();
    expect(fieldFN.tagName).toEqual("INPUT");
    expect(fieldFN.type).toEqual("text");
  });

  it("renders the last name field as a text box", () => {
    const customer = { firstName: "Ashley" };

    render(<CustomerForm original={customer} />);

    expect(field("firstName").value).toEqual("Ashley");
  });

  it("renders 'First name' as the first name label content", () => {
    render(<CustomerForm original={blankCustomer} />);

    const label = element("label[for=firstName]");

    expect(label).toContainText("First Name");
  });

  it("renders a submit button", () => {
    render(<CustomerForm original={blankCustomer} />);

    const button = element("button[type=submit]");

    expect(button).not.toBeNull();
  });

  it("saves existing first name when submitted", () => {
    expect.hasAssertions();

    const customer = { firstName: "Ashley" };

    render(
      <CustomerForm
        original={customer}
        onSubmit={(firstName) => {
          event.preventDefault();

          expect(firstName).toEqual("Ashley");
        }}
      />
    );

    const button = element("button[type=submit]");
    click(button);
  });

  it("prevents the default action when submitting the form", () => {
    render(<CustomerForm original={blankCustomer} onSubmit={() => {}} />);

    const event = submit(form());

    expect(event.defaultPrevented).toBe(true);
  });
});
