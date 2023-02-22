import { act } from 'react-dom/test-utils';
// import { act } from '@testing-library/react'
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Appointment } from '../src/Appointment';


describe('Appointment', () => {
    let container;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.replaceChildren(container);
    });
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
