import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with", email, password);
        onLogin();
        navigate("/");
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Vložte váš email"
                        required
                    />
                </label>
                <label>
                    Heslo:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Vložte vaše heslo"
                        required
                    />
                </label>
                <button type="submit">Prihlásiť sa</button>
            </form>
        </div>
    );
};

export default LoginForm;
