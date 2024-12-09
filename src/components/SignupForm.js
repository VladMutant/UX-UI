import React, { useState } from "react";

function SignupForm({ setIsLoggedIn, setUserData }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setUserData({ email });
            setIsLoggedIn(true);
        }, 1000);
    };

    return (
        <form onSubmit={handleSignup}>
            <h2>Sign Up</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;
