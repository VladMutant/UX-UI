import React, { useState } from "react";
import "../App.css";

// ProfilePage component
export default function ProfilePage() {
    const [profile, setProfile] = useState({
        name: "Vladyslav",
        surname: "Chepchyn",
        email: "vladmutant2004@gmail.com",
        phone: "+421999000777",
        registrationDate: "12.05.2023",
        password: "password123",
    });

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handlePasswordChange = (e) => {
        e.preventDefault();


        if (newPassword !== confirmPassword) {
            setError("Nové heslá sa nezhodujú.");
            return;
        }

        setProfile({ ...profile, password: newPassword });
        setError(""); // Clear the error
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Profile Details</h2>
                <p>
                    <strong>Meno:</strong> {profile.name}
                </p>
                <p>
                    <strong>Priezvisko:</strong> {profile.surname}
                </p>
                <p>
                    <strong>Email:</strong> {profile.email}
                </p>
                <p>
                    <strong>Telefón:</strong> {profile.phone}
                </p>
                <p>
                    <strong>Dátum registrácie:</strong> {profile.registrationDate}
                </p>
            </div>

            <div style={styles.card}>
                <h2>Zmena hesla</h2>
                <form onSubmit={handlePasswordChange}>
                    <div style={styles.field}>
                        <label>Súčasné heslo:</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div style={styles.field}>
                        <label>Nové heslo:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div style={styles.field}>
                        <label>Potvrdiť nové heslo:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={styles.error}>{error}</p>}
                    <button type="submit">Zmeniť heslo</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
    },
    card: {
        padding: "20px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    field: {
        marginBottom: "15px",
    },
    error: {
        color: "red",
        fontSize: "14px",
    },
};
