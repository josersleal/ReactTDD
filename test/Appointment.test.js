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

describe('AppointmentsDayView', () => {
    const today = new Date();
    const appointments = [
        { startsAt: today.setHours(12, 0) },
        { startsAt: today.setHours(13, 0) }
    ];
    const component = (<AppointmentsDayView appointments={appointments} />);

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

        expect(listChildren[0].innerHTML).toEqual('12:00');
        expect(listChildren[1].innerHTML).toEqual('13:00');
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
