import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";
import MyReservations from "./components/MyReservations";
import ReservationPage from "./components/ReservationPage";
import "./App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUserData(user);
        navigate("/dashboard");
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/");
    };

    return (
        <div>
            <header>
                <img
                    src="/zbojnicka-logo-262x206-1.png"
                    alt="Zbojnícka Chata"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                />
                <nav className="nav-container">
                    {isLoggedIn ? (
                        <div className="nav-links">
                            <button onClick={() => navigate("/reservation")}>Rezervácia</button>
                            <button onClick={() => navigate("/profile")}>Môj profil</button>
                            <button onClick={() => navigate("/reservations")}>Moje rezervácie</button>
                            <button onClick={handleLogout}>Odhlásiť sa</button>
                        </div>
                    ) : (
                        <div className="nav-links">
                            <button onClick={() => navigate("/login")}>Prihlásiť sa</button>
                            <button onClick={() => navigate("/register")}>Zaregistrovať sa</button>
                        </div>
                    )}
                </nav>
            </header>
            <Routes>
                <Route
                    path="/"
                    element={
                        <main>
                            <div className="intro-section">
                                <img src="/chata_outside.png" alt="Zbojnícka Chata Landscape" />
                                <div className="text">
                                    <h1>Vitajte na Zbojníckej chate</h1>
                                    <p>
                                        Nachádza sa vo Veľkej Studenej doline, ktorá je vo Vysokých Tatrách
                                        výnimočná najväčším počtom plies (26) rôznych veľkosti a charakterov, a je bohatá na
                                        tatranskú faunu i flóru. Je tu nespočetné množstvo turistických, horolezeckých,
                                        skialpinistických a prírodovedeckých aktivít. Chata má strategické miesto aj pre
                                        tých, ktorí plánujú viac dňové prechody Vysokými Tatrami.
                                    </p>
                                </div>
                            </div>
                            <div className="content-section">
                                <div className="text">
                                    <h2>Ubytovanie + Stravovanie</h2>
                                    <p>
                                        Navštívte nás na deň, dva, alebo aj tri...

                                        Zastavte sa na chutný obed počas vašej túry a zažeňte smäd dobrým pivom,
                                        a to všetko s fanstastickým výhľadom na okolité štíty.

                                        Rovnako Vás veľmi radi privítame aj na pár noci, len si nezabudnite Vašu posteľ
                                        vopred zarezervovať, pretože nočný výhľad na Veľkú Studenú dolinu si už
                                        zamilovali mnohí a radi sa často vracajú.
                                    </p>
                                </div>
                                <img src="/chata_inside.jpg" alt="Zbojnícka Chata Inside" />
                            </div>
                            <div className="activities-section">
                                <h2>Prístup na chatu + Aktivity</h2>
                                <p>
                                    Turistický chodník Vás ku nám privedie krásnou Veľkou Studenou dolinou z
                                    Hrebienka (2-2,5 h), na ktorý sa môžte vyviesť zubačkou zo Starého Smokovca.
                                    Tí zdatnejší môžu začať už v Smokovci (30min na viac). Pre iné prístupové trasy
                                    kliknite nižšie.

                                    Veľká Studená dolina ponúka množstvo aktivít v lete aj v zime – turistika,
                                    skialpinizmus, horolezectvo, a obdivovanie zvierat a rastlín. Sme si istí, že nudiť
                                    sa nebudete ani po dvoch dňoch.
                                </p>
                                <img src="/aktivity-circles.jpg" alt="Hiking" />
                            </div>
                            <div className="activities-section">
                                <img src="/landscape4.jpg" alt="Peak 1" />
                                <img src="/landscape5.jpg" alt="Peak 2" />
                                <img src="/landscape6.jpg" alt="Zbojnícka Chata at Night" />
                            </div>
                        </main>
                    }
                />
                <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                <Route path="/register" element={<RegisterForm onRegister={handleLogin} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<ProfilePage userData={userData} />} />
                <Route path="/reservations" element={<MyReservations />} />
                <Route path="/reservation" element={<ReservationPage />} />
            </Routes>
            <footer>
                <div>
                    <h3>Zbojnícka chata</h3>
                    <p>Zbojníčka má celoročnú prevádzku. Nachádza sa v
                        nadmorskej výške 1960m vo Veľkej Studej doline a
                        vedenie na ňu niekoľko prístupových trás.</p>
                </div>
                <div className="partners">
                    <h3>Partneri</h3>
                    <img src="/partneri-loga-nove.png" alt="Partner 3" />
                </div>
            </footer>
        </div>
    );
}

export default App;
