import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ReservationPage() {
    const [reservation, setReservation] = useState({
        arrivalDate: "",
        departureDate: "",
        guests: 1,
        roomType: "viacložková izba",
        meals: "",
        notes: "",
        paymentMethod: "cash",
        cardDetails: {
            cardNumber: "",
            cvv: "",
            expiryDate: "",
        },
    });

    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const roomPrices = {
        "viacložková izba": 20,
        "na podlahe v jedálni": 10,
    };

    const mealPrices = {
        večera: 5,
        raňajky: 3,
        "večera a raňajky": 8,
    };

    const calculateTotalSum = () => {
        const days = Math.max(
            (new Date(reservation.departureDate) - new Date(reservation.arrivalDate)) /
            (1000 * 60 * 60 * 24),
            1
        );
        const roomCost = days * reservation.guests * roomPrices[reservation.roomType];
        const mealCost = days * reservation.guests * (mealPrices[reservation.meals] || 0);
        return roomCost + mealCost;
    };

    const handleReservationChange = (e) => {
        const { name, value } = e.target;

        if (name in reservation.cardDetails) {
            let formattedValue = value;

            if (name === "cardNumber") {
                formattedValue = value
                    .replace(/\D/g, "")
                    .replace(/(.{4})/g, "$1 ")
                    .trim();
            } else if (name === "expiryDate") {
                formattedValue = value
                    .replace(/\D/g, "")
                    .replace(/^(\d{2})(\d{1,2})?$/, (_, mm, yy) =>
                        yy ? `${mm}/${yy}` : mm
                    );
            }

            setReservation({
                ...reservation,
                cardDetails: { ...reservation.cardDetails, [name]: formattedValue },
            });
        } else {
            setReservation({ ...reservation, [name]: value });
        }
    };

    const validateStep1 = () => {
        const { arrivalDate, departureDate, guests } = reservation;
        if (!arrivalDate || !departureDate || guests <= 0) {
            setErrors("Please fill out all required fields and ensure guests count is valid.");
            return false;
        }
        if (new Date(arrivalDate) >= new Date(departureDate)) {
            setErrors("Departure date must be after arrival date.");
            return false;
        }
        setErrors("");
        return true;
    };

    const validateCardDetails = () => {
        const { cardNumber, cvv, expiryDate } = reservation.cardDetails;

        if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) {
            setErrors("Invalid card number. It must be 16 digits in groups of 4.");
            return false;
        }
        if (!/^\d{3}$/.test(cvv)) {
            setErrors("Invalid CVV. It must be 3 digits.");
            return false;
        }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            setErrors("Invalid expiration date. Use MM/YY format.");
            return false;
        }

        setErrors("");
        return true;
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        if (step === 1 && validateStep1()) {
            setStep(2);
        }
    };

    const handlePayment = (e) => {
        e.preventDefault();
        if (reservation.paymentMethod === "card" && !validateCardDetails()) {
            return;
        }
        setStep(1);
        setReservation({
            arrivalDate: "",
            departureDate: "",
            guests: 1,
            roomType: "viacložková izba",
            meals: "",
            notes: "",
            paymentMethod: "cash",
            cardDetails: { cardNumber: "", cvv: "", expiryDate: "" },
        });
        navigate("/");
    };

    return (
        <div className="App">
            <form onSubmit={handleNextStep}>
                {step === 1 && (
                    <fieldset>
                        <h2>Rezervácia</h2>
                        <div className="Field">
                            <label>
                                Dátum príchodu <sup>*</sup>
                            </label>
                            <input
                                type="date"
                                name="arrivalDate"
                                value={reservation.arrivalDate}
                                onChange={handleReservationChange}
                                required
                            />
                        </div>
                        <div className="Field">
                            <label>
                                Dátum odchodu <sup>*</sup>
                            </label>
                            <input
                                type="date"
                                name="departureDate"
                                value={reservation.departureDate}
                                onChange={handleReservationChange}
                                required
                            />
                        </div>
                        <div className="Field">
                            <label>
                                Počet osôb <sup>*</sup>
                            </label>
                            <input
                                type="number"
                                name="guests"
                                value={reservation.guests}
                                min="1"
                                onChange={handleReservationChange}
                                required
                            />
                        </div>
                        <div className="Field">
                            <label>Typ izby</label>
                            <select
                                name="roomType"
                                value={reservation.roomType}
                                onChange={handleReservationChange}
                            >
                                <option value="viacložková izba">Viaclôžková izba</option>
                                <option value="na podlahe v jedálni">Na podlahe v jedálni</option>
                            </select>
                        </div>
                        <div className="Field">
                            <label>Záujem o večeru alebo raňajky</label>
                            <select
                                name="meals"
                                value={reservation.meals}
                                onChange={handleReservationChange}
                            >
                                <option value="">Nezáujem</option>
                                <option value="večera">Večera</option>
                                <option value="raňajky">Raňajky</option>
                                <option value="večera a raňajky">Večera a raňajky</option>
                            </select>
                        </div>
                        <div className="Field">
                            <label>Špeciálne poznámky</label>
                            <textarea
                                name="notes"
                                value={reservation.notes}
                                onChange={handleReservationChange}
                                placeholder="Vaše poznámky..."
                            />
                        </div>
                        {errors && <p className="Error">{errors}</p>}
                        <button type="submit">Ďalej</button>
                    </fieldset>
                )}

                {step === 2 && (
                    <fieldset>
                        <h2>Zhrnutie rezervácie</h2>
                        <p><strong>Dátum príchodu:</strong> {reservation.arrivalDate}</p>
                        <p><strong>Dátum odchodu:</strong> {reservation.departureDate}</p>
                        <p><strong>Počet osôb:</strong> {reservation.guests}</p>
                        <p><strong>Typ izby:</strong> {reservation.roomType}</p>
                        <p><strong>Záujem o jedlo:</strong> {reservation.meals || "Žiadne"}</p>
                        <p><strong>Špeciálne poznámky:</strong> {reservation.notes || "Žiadne"}</p>
                        <p>
                            <strong>Celková suma:</strong> {calculateTotalSum()} € {/* Total sum */}
                        </p>
                        <div className="Field">
                            <label>Spôsob platby</label>
                            <select
                                name="paymentMethod"
                                value={reservation.paymentMethod}
                                onChange={handleReservationChange}
                            >
                                <option value="cash">V hotovosti</option>
                                <option value="card">Kartou online</option>
                            </select>
                        </div>
                        <button onClick={() => setStep(3)}>Pokračovať na platbu</button>
                    </fieldset>
                )}

                {step === 3 && (
                    <fieldset>
                        <h2>Platba</h2>
                        {reservation.paymentMethod === "card" ? (
                            <>
                                <div className="Field">
                                    <label>Číslo karty</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={reservation.cardDetails.cardNumber}
                                        onChange={handleReservationChange}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        required
                                    />
                                </div>
                                <div className="Field">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={reservation.cardDetails.cvv}
                                        onChange={handleReservationChange}
                                        placeholder="CVV"
                                        maxLength="3"
                                        required
                                    />
                                </div>
                                <div className="Field">
                                    <label>Platnosť karty</label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={reservation.cardDetails.expiryDate}
                                        onChange={handleReservationChange}
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        required
                                    />
                                </div>
                            </>
                        ) : (
                            <p>Vybrali ste platbu v hotovosti.</p>
                        )}
                        {errors && <p className="Error">{errors}</p>}
                        <button onClick={handlePayment}>Dokončiť platbu</button>
                    </fieldset>
                )}
            </form>
        </div>
    );
}

export default ReservationPage;
