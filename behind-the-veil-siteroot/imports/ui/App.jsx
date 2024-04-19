import React from 'react';
import {NavigationBar} from '../../client/components/navigation-bar/navigation-bar.jsx'

import {ArtistsPage} from '../../client/components/pages/artists-page'
import {HomePage} from '../../client/components/pages/home-page'
import {ServicesPage} from '../../client/components/pages/services-page'
import {LoginPage} from '../../client/components/pages/login-page'
import {RegisterPage} from '../../client/components/pages/register-page'

// import {Examples} from '../../client/components/pages/Examples.jsx'


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

                    {/*<Route path="/examples" element={<Examples />} />  /!* removed once dev is finished*!/*/}

                    {/* Define other routes that you need*/}
                </Routes>
            </main>
        </Router>


        {/*<h1>Welcome to Meteor!</h1>*/}
        {/*<Hello/>*/}
        {/*<Info/>*/}



    </div>
);
