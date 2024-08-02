import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Examples from "./components/pages/examples/Examples.jsx";

import NavigationBar from "./components/navigationBar/NavigationBar.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import NonExistingPage from "./components/pages/nonExistingPage/NonExistingPage";

import HomePage from "./components/pages/home/HomePage.jsx";
import ProfilePage from "./components/pages/profile/ProfilePage";
import ProfileSettingsPage from "./components/pages/profile/settings/ProfileSettingsPage";

import ServicesPage from "./components/pages/service/ServicesPage.jsx";
import SpecificServicePage from "./components/pages/service/SpecificServicePage.jsx";
import ArtistsPage from "./components/pages/artist/ArtistsPage.jsx";
import MessagesPage from "./components/pages/messages/MessagesPage.jsx";

import LoginPage from "./components/pages/login/LoginPage.jsx";
import RegisterPage from "./components/pages/register/RegisterPage.jsx";
import CreateAccountPage from "./components/pages/register/CreateAccountPage";
import ActivateAccountPage from "./components/pages/register/ActivateAccountPage";
import ForgotPasswordPage from "./components/pages/forgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/forgotPassword/ResetPasswordPage";
import ResetCompletePage from "./components/pages/forgotPassword/ResetCompletePage";

import BookingDetailsPage from "./components/pages/request-booking/BookingDetailsPage";
import CancelBooking from "./components/pages/cancel-booking/CancelBooking.jsx";

import RequestBooking from "./components/pages/request-booking/RequestBooking.jsx";
import PaymentDetails from "./components/pages/request-booking/PaymentDetails";
import BookingSummary from "./components/pages/request-booking/BookingSummary";
import BookingConfirmation from "./components/pages/request-booking/BookingConfirmation";

import RoutingAccess from "./enums/RoutingAccess";
import UrlBasePath from "./enums/UrlBasePath";
import AddEditServicePage from "./components/pages/service/AddEditServicePage.jsx";

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
                    <Route path={`/${UrlBasePath.HOME}`} element={<HomePage />} />
                    <Route path="*" element={<NonExistingPage />} /> {/*default path for all other non-routed paths*/}
                    <Route path={`/${UrlBasePath.SERVICES}`} element={<ServicesPage />} />
                    <Route path={`/${UrlBasePath.SERVICES}/:serviceId`} element={<SpecificServicePage />} />
                    <Route path={`/${UrlBasePath.ARTISTS}`} element={<ArtistsPage />} />
                    {/*routes that NOT authenticated users can access*/}
                    <Route
                        path={`/${UrlBasePath.LOGIN}`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}>
                                <LoginPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={`/${UrlBasePath.REGISTER}`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}>
                                <RegisterPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={`/${UrlBasePath.REGISTER}/createAccount`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}>
                                <CreateAccountPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={`/${UrlBasePath.REGISTER}/activateAccount`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}>
                                <ActivateAccountPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={`/${UrlBasePath.FORGOT_PASSWORD}`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}>
                                <ForgotPasswordPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={`/${UrlBasePath.RESET_PASSWORD}/:token`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}>
                                <ResetPasswordPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={`/${UrlBasePath.RESET_PASSWORD}/complete`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}>
                                <ResetCompletePage />
                            </ProtectedRoute>
                        }
                    />
                    {/*routes that ONLY authenticated users can access*/}
                    <Route
                        path={`/${UrlBasePath.MESSAGES}`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}>
                                <MessagesPage />
                            </ProtectedRoute>
                        }
                    />
                    {/*profile related pages*/}
                    <Route
                        path={`/${UrlBasePath.PROFILE}`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    {/*todo: general settings and change password pages here too*/}
                    <Route
                        path={`/${UrlBasePath.PROFILE}/settings`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}>
                                <ProfileSettingsPage />
                            </ProtectedRoute>
                        }
                    />
                    {/*Add and Edit Service Pages for Artist*/}
                    <Route
                        path={`/${UrlBasePath.SERVICES}/addservice`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}>
                                <AddEditServicePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={`/${UrlBasePath.SERVICES}/:serviceId/editservice`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}>
                                <AddEditServicePage isEdit />
                            </ProtectedRoute>
                        }
                    />
                    {/* booking related */}
                    <Route path="/booking/:bookingId" element={<BookingDetailsPage/>}/>

                    {/*requesting booking flow*/}
                    <Route path={`/${UrlBasePath.SERVICES}/:serviceId/request-booking`} element={<RequestBooking />} />
                    <Route path="/booking-summary" element={<BookingSummary />} />
                    <Route path="/payment-details" element={<PaymentDetails />} />
                    <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                    {/* TODO: haven't implemented actual flow to get here yet */}
                    <Route path="/cancel-booking" element={<CancelBooking/>}/>
                </Routes>
            </main>
        </Router>
    </div>
);
