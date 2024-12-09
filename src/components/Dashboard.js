import React from "react";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h2>Vitajte!</h2>
            <button onClick={() => alert("Rezervácia ")}>Rezervácia</button>
            <button onClick={() => alert("Môj profil ")}>Môj profil</button>
            <button onClick={() => alert("Moje rezervácie ")}>Moje rezervácie</button>
        </div>
    );
};

export default Dashboard;
