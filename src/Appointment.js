import React from 'react'

const appointmentTimeOfDay = (startsAt) => {
    const [h, m] = new Date(startsAt)
        .toTimeString()
        .split(':');
    return `${h}:${m}`;
    // return '${h}:${m}'
}


export const Appointment = ({ customer }) => {
    return (
        <div>{customer.firstName}</div>
    )
}

export const AppointmentsDayView = ({ appointments }) => {
    return (
        <div id="appointmentsDayView">
            <ol>
                {appointments.map((a) => (

                    <li key={a.startsAt}>
                        {appointmentTimeOfDay(a.startsAt)}
                    </li>
                ))}
            </ol>
        </div >
    )
}


