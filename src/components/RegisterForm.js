import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const RegisterForm = ({ onRegister }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Heslá sa nezhodujú. Skúste to znova.");
            return;
        }

        console.log("Registering with:", { name, surname, email, phone, password });
        setError("");
        onRegister();
        navigate("/");
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Meno:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Vložte vaše meno"
                        required
                    />
                </label>
                <label>
                    Priezvisko:
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Vložte vaše priezvisko"
                        required
                    />
                </label>
                <label>
                    E-mail:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Vložte váš e-mail"
                        required
                    />
                </label>
                <label>
                    Telefónne číslo:
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Vložte vaše telefónne číslo"
                        required
                    />
                </label>
                <label>
                    Heslo:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Vytvorte heslo"
                        required
                    />
                </label>
                <label>
                    Potvrdiť heslo:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Potvrďte heslo"
                        required
                    />
                </label>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Zaregistrovať sa</button>
            </form>
        </div>
    );
};

export default RegisterForm;
