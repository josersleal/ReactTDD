import { act } from "react-dom/test-utils";
import React from "react";
import ReactDOM from "react-dom/client";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";
import {
  initializeReactContainer,
  render,
  click,
  element,
  elements,
  typesOf,
  textOf,
  container,
} from "./reactTestExtensions";

beforeEach(() => {
  initializeReactContainer();
});

afterEach(() => {
  // document.removeChild(document.getElementById('#appointmentsDayView > ol'));
});

describe("AppointmentsDayView", () => {
  const today = new Date();
  const twoAppointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: "Ashtley" },
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: "Jordan" },
    },
  ];
  let componentADV2A = <AppointmentsDayView appointments={twoAppointments} />;

  it("renders a div with right id", () => {
    const component = <AppointmentsDayView appointments={[]} />;
    render(component);
    expect(element("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    const component = <AppointmentsDayView appointments={[]} />;
    render(component);

    const listElement = element("ol");
    expect(listElement).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(componentADV2A);

    const listChildren = elements("ol > li");

    expect(listChildren).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(componentADV2A);

    expect(textOf(elements("li"))).toEqual(["12:00", "13:00"]);

    /*     const listChildren = elements("li");

    expect(listChildren[0].innerHTML).toContain("12:00");
    expect(listChildren[1].innerHTML).toContain("13:00"); */
  });

  it("initialy shows a message saying there are no appointments today", () => {
    const component = <AppointmentsDayView appointments={[]} />;
    render(component);

    expect(document.body.textContent).toContain(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default", () => {
    render(componentADV2A);
    expect(document.body.textContent).toContain("Ashtley");
  });

  it("has a button element in each li", () => {
    render(componentADV2A);

    expect(typesOf(elements("li > *"))).toEqual(["button", "button"]);

    /*     const buttons = elements("li > button");

    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button"); */
  });

  it("renders another appointment when selected", () => {
    render(componentADV2A);
    const secondButton = elements("button")[1];

    click(secondButton);

    expect(document.body.textContent).toContain("Jordan");
  });

  it("adds toggled class to button when selected", () => {
    render(componentADV2A);

    const button = elements("button")[1];

    click(button);

    expect(button.className).toContain("toggled");
  });

  it("does not add toggled class if button is not selected", () => {
    render(componentADV2A);

    expect(elements("button")[1].className).not.toContain("toggled");
  });
});

describe("Appointment", () => {
  describe("Appointment table", () => {
    let appointmentTable = () =>
      document.querySelector("#appointmentView > table");
    const blankCustomer = { firstName: "", lastName: "" };

    it("renders a table", () => {
      render(<Appointment customer={blankCustomer} />);

      expect(appointmentTable).not.toBeNull();
    });

    it("renders another customer 1st name with act at the table", () => {
      const customer = { firstName: "Jordan" };
      const component = <Appointment customer={customer} />;

      render(component);
      expect(appointmentTable().textContent).toContain(customer.firstName);
    });

    it("renders the customer last name", () => {
      const customer = { firstName: "Jordan", lastName: "Jones" };
      const component = <Appointment customer={customer} />;
      render(component);

      expect(appointmentTable().textContent).toContain(customer.lastName);
    });

    it("renders the customer phone number", () => {
      // global.IS_REACT_ACT_ENVIRONMENT = true;

      const customer = {
        firstName: "Jordan",
        lastName: "Jones",
        phoneNumber: "1",
      };
      const component = <Appointment customer={customer} />;
      render(component);

      expect(appointmentTable().textContent).toContain(customer.phoneNumber);
    });
    it("renders the stylist name", () => {
      // global.IS_REACT_ACT_ENVIRONMENT = true;

      const customer = {
        stylist: "Sam",
      };
      const component = <Appointment customer={customer} />;
      render(component);

      expect(appointmentTable().textContent).toContain(customer.stylist);
    });

    it("renders the salon service", () => {
      const component = <Appointment customer={blankCustomer} service="cut" />;

      render(component);

      expect(appointmentTable().textContent).toContain("cut");
    });
    it("renders another salon service", () => {
      const component = (
        <Appointment customer={blankCustomer} service="Blow-dry" />
      );

      render(component);

      expect(appointmentTable().textContent).toContain("Blow-dry");
    });

    it("renders the appointments notes", () => {
      const component = <Appointment customer={blankCustomer} notes="abc" />;

      render(component);

      expect(appointmentTable().textContent).toContain("abc");
    });

    it("renders the time as the heading", () => {
      const timestamp = new Date().setHours(9, 0, 0);
      const component = (
        <Appointment customer={blankCustomer} startsAt={timestamp} />
      );

      render(component);

      expect(document.querySelector("h3").textContent).toEqual(
        "Today’s appointment at 09:00"
      );
    });

    it("renders other appointment notes", () => {
      const component = <Appointment customer={blankCustomer} notes="def" />;

      render(component);

      expect(appointmentTable().textContent).toContain("def");
    });
  });
});
