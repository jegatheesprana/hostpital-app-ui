/* global gapi */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import Leftside from "../Dashbaord/LeftsidePatient";
import { useAuth } from "Auth/AuthContext";

const AppointmentStatus = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState()
    const [filteredAppointments, setFilteredAppointments] = useState()

    const { user } = useAuth()

    function getMeetLink(id) {
        if (filteredAppointments !== undefined) {
            const meetCode = filteredAppointments.find((apntmnt) => {
                return apntmnt.id === id
            })

            return meetCode ? meetCode.hangoutLink : "#"
        }
        return '#'
    }

    useEffect(() => {
        setIsLoading(true)

        const fetchAppointments = async () => {
            var { data } = await Axios.post(
                `${process.env.REACT_APP_SERVER_URL}/patients/upcoming-appointments/`,
                {
                    patientId: user._id,
                }
            );

            // const response = await window.gapi.client.calendar.events.list({
            //     'calendarId': 'primary',
            //     'timeMin': (new Date()).toISOString(),
            //     'showDeleted': false,
            //     'singleEvents': true,
            //     'maxResults': 100,
            //     'orderBy': 'startTime'
            // })

            // // Filter google calendar events
            // const events = response.result.items
            // const filteredEvents = events.filter((event) => {
            //     return data.find((it) => it._id === event.id)
            // })

            console.log(data)
            setAppointments(data);
            // console.log(filteredEvents)
            // setFilteredAppointments(filteredEvents)
        };

        fetchAppointments()
        setIsLoading(false)
    }, []);



    return (
        <div className="bg-dark" style={{ minHeight: "100vh" }}>
            <Navbar />
            <div>
                <div className="row m-5" style={{ maxWidth: "100%" }}>
                    <div
                        className="col-3 col-md-3 p-4 bg-white "
                        style={{ minHeight: "80vh" }}
                    >
                        <Leftside />
                    </div>
                    {isLoading && <h1>Loading</h1>}
                    {!isLoading && <div
                        className="col-9 col-md-9 p-4"
                        style={{
                            border: "15px solid yellow ",
                            minHeight: "80vh",
                            backgroundColor: "#6c757d",
                        }}
                    >
                        <table className="table table-hover table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Doctor Name</th>
                                    <th scope="col">Meet Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((Appointment) => (
                                    <tr key={Appointment._id}>
                                        <th scope="row">{Appointment.date}</th>
                                        <th scope="row">{Appointment.slotTime}</th>
                                        <th scope="row">{Appointment.doctorName}</th>
                                        <th scope="row"> <a href={Appointment.googleMeetLink || `https://meet.google.com/${Appointment._id}`} target="_blank">Join Meet</a></th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default AppointmentStatus;