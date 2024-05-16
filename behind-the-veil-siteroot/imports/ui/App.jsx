import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";

import NavigationBar from "./components/navigationBar/NavigationBar.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";

import Examples from "./components/pages/examples/Examples.jsx";

import HomePage from "./components/pages/home/HomePage.jsx";
import ServicesPage from "./components/pages/service/ServicesPage.jsx";
import ArtistsPage from "./components/pages/artist/ArtistsPage.jsx";
import MessagesPage from "./components/pages/messages/MessagesPage.jsx";
import LoginPage from "./components/pages/login/LoginPage.jsx";
import RegisterPage from "./components/pages/register/RegisterPage.jsx";
import RequestBooking from "./components/pages/request-booking/RequestBooking.jsx";
import SpecificServicePage from "./components/pages/service/SpecificServicePage.jsx";
import ArtistServiceArea from "./components/pages/artist/ArtistServiceArea.jsx";
import ArtistProfilePage from "./components/pages/profile/ArtistProfilePage.jsx";
import CancelBooking from './components/pages/cancel-booking/CancelBooking.jsx';
import ForgotPasswordPage from "./components/pages/forgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/forgotPassword/ResetPasswordPage";
import ResetCompletePage from "./components/pages/forgotPassword/ResetCompletePage";
import CreateAccountPage from "./components/pages/register/CreateAccountPage";
import ActivateAccountPage from "./components/pages/register/ActivateAccountPage";
import BookingSummary from "./components/pages/request-booking/BookingSummary";
import RoutingAccess from "./enums/RoutingAccess";
import UrlBasePath from "./enums/UrlBasePath";
import ArtistAddPost from "./components/pages/profile/ArtistAddPost.jsx";

export const App = () => (
    <div>
        {/*This is the navigation bar on every Page*/}
        <Router>
            <NavigationBar/>
            <main className="main-content">
                <Routes>

                    {/* removed once dev is finished*/}
                    <Route path={`/${UrlBasePath.EXAMPLES}`} element={<Examples/>}/>

                    {/*routes that any user can access*/}
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="*" element={ <Navigate to="/" /> }/> {/*default path for all other non-routed paths*/}

                    <Route path="/services" element={<ServicesPage/>}/>
                    <Route path="/services/:serviceId" element={<SpecificServicePage/>}/>

                    <Route path="/artists" element={<ArtistsPage/>}/>

                    {/*routes that NOT authenticated users can access*/}
                    <Route
                        path="/login"
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}><LoginPage/></ProtectedRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}><RegisterPage/></ProtectedRoute>
                        }
                    />
                    <Route
                        path="/register/createAccount/"
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}><CreateAccountPage/></ProtectedRoute>
                        }
                    />
                    <Route
                        path="/register/activateAccount"
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}><ActivateAccountPage/></ProtectedRoute>
                        }
                    />

                    <Route
                        path="/forgot-password"
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}><ForgotPasswordPage/></ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reset-password/:token"
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}><ResetPasswordPage/></ProtectedRoute>
                        }
                    />

                    <Route
                        path="/reset-password/complete"
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}><ResetCompletePage/></ProtectedRoute>
                        }
                    />

                    {/*routes that ONLY authenticated users can access*/}
                    <Route
                        path="/messages"
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}><MessagesPage/></ProtectedRoute>
                        }
                    />

                    <Route
                        path="/artist-profile/:username"
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}><ArtistProfilePage/></ProtectedRoute>
                        }
                    />

                    {/* TODO: haven't implemented actual flow to get here yet */}
                    <Route path="/service-area" element={<ArtistServiceArea/>}/>
                    <Route path="/request-booking" element={<RequestBooking/>}/>
                    <Route path="/cancel-booking" element={<CancelBooking/>}/>
                    <Route path="/booking-summary" element={<BookingSummary/>}/>
                    <Route path="/add-post" element={<ArtistAddPost/>}/>



                </Routes>
            </main>
        </Router>
    </div>
);
