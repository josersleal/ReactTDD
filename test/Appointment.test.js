import { act } from 'react-dom/test-utils';
// import { act } from '@testing-library/react'
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Appointment, AppointmentsDayView } from '../src/Appointment';

let container;
beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
});
afterEach(() => {

    // document.removeChild(document.getElementById('#appointmentsDayView > ol'));
});

describe('AppointmentsDayView', () => {
    const today = new Date();
    const twoAppointments = [
        {
            startsAt: today.setHours(12, 0),
            customer: { firstName: "Ashtley" }
        },
        {
            startsAt: today.setHours(13, 0),
            customer: { firstName: "Jordan" }
        }
    ];
    let component = (<AppointmentsDayView appointments={twoAppointments} />);

    it('renders a div with right id', () => {
        const component = (<AppointmentsDayView appointments={[]} />)
        render(container, component);
        expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
    });

    it('renders an ol element to display appointments', () => {
        const component = (<AppointmentsDayView appointments={[]} />)
        render(container, component);

        const listElement = document.querySelector('ol');
        expect(listElement).not.toBeNull()
    });

    it('renders an li for each appointment', () => {

        render(container, component);

        const listChildren = document.querySelectorAll('ol > li');

        expect(listChildren).toHaveLength(2);

    });

    it('renders the time of each appointment', () => {

        render(container, component);

        const listChildren = document.querySelectorAll('li');

        expect(listChildren[0].innerHTML).toContain('12:00');
        expect(listChildren[1].innerHTML).toContain('13:00');
    });

    it('initialy shows a message saying there are no appointments today', () => {
        const component = (<AppointmentsDayView appointments={[]} />);
        render(container, component);

        expect(document.body.textContent).toContain(
            "There are no appointments scheduled for today."
        )
    });

    it('selects the first appointment by default', () => {
        render(container, component);
        expect(document.body.textContent).toContain('Ashtley');
    });

    it('has a button element in each li', () => {
        render(container, component);

        const buttons = document.querySelectorAll('li > button');

        expect(buttons).toHaveLength(2);
        expect(buttons[0].type).toEqual("button");
    });

    it('renders another appointment when selected', () => {
        render(container, component);
        const button = document.querySelectorAll('button')[1];

        act(() => button.click())

        expect(document.body.textContent).toContain('Jordan');

    });
});

describe('Appointment', () => {

    it.skip('renders the customer 1st name', async () => {
        global.IS_REACT_ACT_ENVIRONMENT = false;
        const customer = { firstName: "Ashley" };
        const component = (
            <Appointment customer={customer} />
        )
        const container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.createRoot(container).render(component)
        await new Promise(setTimeout);
        // act(() => ReactDOM.createRoot(container).render(component));
        expect(document.body.textContent).toContain("Ashley");
    })
    it('renders the customer 1st name with act', () => {
        global.IS_REACT_ACT_ENVIRONMENT = true;
        const customer = { firstName: "Ashley" };
        const component = (
            <Appointment customer={customer} />
        )
        render(container, component);

        expect(document.body.textContent).toContain("Ashley");
    })
    it('renders another customer 1st name with act', () => {
        global.IS_REACT_ACT_ENVIRONMENT = true;
        const customer = { firstName: "Jordan" };
        const component = (
            <Appointment customer={customer} />
        )
        render(container, component);

        expect(document.body.textContent).toContain(customer.firstName);
    })


})

function render(container, component) {
    act(() => ReactDOM.createRoot(container).render(component));
}
