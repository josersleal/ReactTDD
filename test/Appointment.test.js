import { act } from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import { Appointment } from '../src/Appointment';


describe('Appointment', () => {
    it('renders the customer 1st name', async () => {
        const customer = { firstName: "Ashley" };
        const component = (
            <Appointment customer={customer} />
        )
        console.log("component: ", component);
        const container = document.createElement("div");
        document.body.appendChild(container);
        act(() => ReactDOM.createRoot(container).render(component))
        expect(document.body.textContent).toContain("Ashley");
    })

})