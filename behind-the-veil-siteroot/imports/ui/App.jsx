import React from "react";

import NavigationBar from './components/navigationBar/NavigationBar.jsx'
import Examples from './components/pages/Examples.jsx'

import {ArtistsPage} from './components/pages/ArtistsPage.jsx'
import {HomePage} from './components/pages/HomePage.jsx'
import {ServicesPage} from './components/pages/ServicesPage.jsx'
import {LoginPage} from './components/pages/LoginPage.jsx'
import {RegisterPage} from './components/pages/RegisterPage.jsx'


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export const App = () => (

    <div>

        {/*This is the navigation bar on every Page*/}
        <Router>
            <NavigationBar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/artists" element={<ArtistsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/examples" element={<Examples />} />  {/* removed once dev is finished*/}

                    {/* Define other routes that you need*/}
                </Routes>
            </main>
        </Router>


        {/*<h1>Welcome to Meteor!</h1>*/}
        {/*<Hello/>*/}
        {/*<Info/>*/}



    </div>
);
