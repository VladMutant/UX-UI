import React, { useState, useEffect } from "react";
import "../App.css"; // Assuming App.css is the stylesheet

function MyReservations() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        // Simulated API call to fetch reservations
        const mockReservations = [
            {
                id: 1,
                arrivalDate: "2024-12-10",
                departureDate: "2024-12-12",
                guests: 2,
                roomType: "Viaclôžková izba",
                meals: "Večera a raňajky",
                notes: "Preferovať tiché izby.",
                totalCost: 120,
            },
            {
                id: 2,
                arrivalDate: "2024-12-15",
                departureDate: "2024-12-18",
                guests: 3,
                roomType: "Na podlahe v jedálni",
                meals: "Raňajky",
                notes: "Donesiem si spacák.",
                totalCost: 90,
            },
        ];

        setTimeout(() => setReservations(mockReservations), 1000); // Simulating loading delay
    }, []);

    return (
        <div className="ReservationsContainer">
            <h1 className="ReservationsTitle">Moje Rezervácie</h1>
            {reservations.length === 0 ? (
                <p className="LoadingMessage">Načítavam vaše rezervácie...</p>
            ) : (
                <div className="ReservationList">
                    {reservations.map((reservation) => (
                        <div key={reservation.id} className="ReservationCard">
                            <h2>Rezervácia #{reservation.id}</h2>
                            <p><strong>Dátum príchodu:</strong> {reservation.arrivalDate}</p>
                            <p><strong>Dátum odchodu:</strong> {reservation.departureDate}</p>
                            <p><strong>Počet osôb:</strong> {reservation.guests}</p>
                            <p><strong>Typ izby:</strong> {reservation.roomType}</p>
                            <p><strong>Jedlá:</strong> {reservation.meals || "Žiadne"}</p>
                            <p><strong>Poznámky:</strong> {reservation.notes || "Žiadne"}</p>
                            <p><strong>Celková suma:</strong> {reservation.totalCost} €</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyReservations;
