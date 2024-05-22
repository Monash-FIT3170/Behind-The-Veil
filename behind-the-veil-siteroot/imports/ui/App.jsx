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
import PaymentDetails from "./components/pages/request-booking/PaymentDetails";
import SpecificServicePage from "./components/pages/service/SpecificServicePage.jsx";
import ArtistServiceArea from "./components/pages/profile/artist/ArtistServiceArea.jsx";
import ArtistProfilePage from "./components/pages/profile/artist/ArtistProfilePage.jsx";
import CancelBooking from './components/pages/cancel-booking/CancelBooking.jsx';
import ForgotPasswordPage from "./components/pages/forgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/forgotPassword/ResetPasswordPage";
import ResetCompletePage from "./components/pages/forgotPassword/ResetCompletePage";
import CreateAccountPage from "./components/pages/register/CreateAccountPage";
import ActivateAccountPage from "./components/pages/register/ActivateAccountPage";
import BookingSummary from "./components/pages/request-booking/BookingSummary";
import RoutingAccess from "./enums/RoutingAccess";
import UrlBasePath from "./enums/UrlBasePath";
import NonExistingPage from "./components/pages/nonExistingPage/NonExistingPage";
import BrideProfilePage from "./components/pages/profile/bride/BrideProfilePage.jsx"
import BookingConfirmation from "./components/pages/request-booking/BookingConfirmation";
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
                    <Route path="*" element={<NonExistingPage/> } /> {/*default path for all other non-routed paths*/}

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
                    {/*todo: general settings and change password pages here too*/}

                    {/*artist profile ONLY related*/}
                    <Route
                        path="/artist-profile/:username"
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}><ArtistProfilePage/></ProtectedRoute>
                        }
                    />
                    <Route path="/artist-profile/:username/service-area" element={<ArtistServiceArea/>}/>

                    {/*bride profile ONLY related*/}
                    <Route
                        path="/bride-profile/:username"
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}><BrideProfilePage/></ProtectedRoute>
                        }
                    />

                    {/*requesting booking flow*/}
                    <Route path="/services/:serviceId/request-booking" element={<RequestBooking/>}/>
                    <Route path="/booking-summary" element={<BookingSummary/>}/>
                    <Route path="/payment-details" element={<PaymentDetails/>}/>
                    <Route path="/booking-confirmation" element={<BookingConfirmation/>}/>

                    {/* TODO: haven't implemented actual flow to get here yet */}
                    <Route path="/cancel-booking" element={<CancelBooking/>}/>
                    <Route path="/add-post" element={<ArtistAddPost/>}/>
                </Routes>
            </main>
        </Router>
    </div>
);