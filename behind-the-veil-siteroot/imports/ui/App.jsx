import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Examples from "./components/pages/examples/Examples.jsx";

import NavigationBar from "./components/navigationBar/NavigationBar.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import NonExistingPage from "./components/pages/nonExistingPage/NonExistingPage";

import HomePage from "./components/pages/home/HomePage.jsx";
import ProfilePage from "./components/pages/profile/ProfilePage";
import ProfileSettingsPage from "./components/pages/profile/settings/ProfileSettingsPage";
// import PaymentEditPage from "./components/pages/profile/settings/PaymentEditPage.jsx";

import ServicesPage from "./components/pages/service/ServicesPage.jsx";
import SpecificServicePage from "./components/pages/service/SpecificServicePage.jsx";
import ArtistsPage from "./components/pages/artist/ArtistsPage.jsx";
import SpecificArtistPage from "./components/pages/artist/SpecificArtistPage";
import MessagesPage from "./components/pages/messages/MessagesPage.jsx";

import LoginPage from "./components/pages/login/LoginPage.jsx";
import RegisterPage from "./components/pages/register/RegisterPage.jsx";
import CreateAccountPage from "./components/pages/register/CreateAccountPage";

import TermConditionPage from "./components/pages/register/TermConditionPage";
import PrivacyPolicyPage from "./components/pages/register/PrivacyPolicyPage";

import ForgotPasswordPage from "./components/pages/forgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/forgotPassword/ResetPasswordPage";
import ResetCompletePage from "./components/pages/forgotPassword/ResetCompletePage";

import BookingDetailsPage from "./components/pages/request-booking/BookingDetailsPage";
import CancelBooking from "./components/pages/cancel-booking/CancelBooking.jsx";

import RequestBooking from "./components/pages/request-booking/RequestBooking.jsx";
import PaymentDetails from "./components/pages/request-booking/PaymentDetails";
import BookingSummary from "./components/pages/request-booking/BookingSummary";
import BookingConfirmation from "./components/pages/request-booking/BookingConfirmation";
import Review from "./components/pages/review/Review";

import AddAvailability from "./components/pages/add-availability/AddAvailability.jsx";

import RoutingAccess from "./enums/RoutingAccess";
import UrlBasePath from "./enums/UrlBasePath";
import AddEditServicePage from "./components/pages/service/AddEditServicePage.jsx";
import EmailVerifyPage from "./components/pages/register/EmailVerifyPage.jsx";
import LinkSentPage from "./components/pages/forgotPassword/LinkSentPage";

import AddEditPostPage from "./components/pages/artist/AddEditPostPage.jsx";

import RequestChangeBooking from "./components/pages/request-booking/requestChangeBooking.jsx";

export const App = () => (
    <div>
        {/*This is the navigation bar on every Page*/}
        <Router>
            <NavigationBar />
            <main className="main-content">
                <Routes>
                    {/* removed once dev is finished*/}
                    <Route path={`/${UrlBasePath.EXAMPLES}`} element={<Examples />} />
                    {/*routes that any user can access*/}
                    <Route path={`/${UrlBasePath.HOME}`} element={<HomePage />} />
                    <Route path="*" element={<NonExistingPage />} /> {/*default path for all other non-routed paths*/}
                    <Route path={`/${UrlBasePath.SERVICES}`} element={<ServicesPage />} />
                    <Route path={`/${UrlBasePath.SERVICES}/:serviceId`} element={<SpecificServicePage />} />
                    <Route path={`/${UrlBasePath.ARTISTS}`} element={<ArtistsPage />} />
                    <Route path={`/${UrlBasePath.ARTISTS}/:artistUsername`} element={<SpecificArtistPage />} />
                    <Route path={`/${UrlBasePath.TERMCONDITION}`} element={<TermConditionPage />} />
                    <Route path={`/${UrlBasePath.PRIVACY_POLICY}`} element={<PrivacyPolicyPage />} />
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
                    <Route path="/verify-email/:token" element={<EmailVerifyPage />} />
                    <Route
                        path={`/${UrlBasePath.REGISTER}/accountCreated`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}>
                                <LinkSentPage />
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
                        path={`/${UrlBasePath.FORGOT_PASSWORD}/link-sent`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_OUT_ONLY}>
                                <LinkSentPage />
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
                        path={`/${UrlBasePath.FORGOT_PASSWORD}/complete`}
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
                    <Route path="/add-availability/:artistUsername" element={<AddAvailability />} />
                    {/*todo: general settings and change password pages here too*/}
                    <Route
                        path={`/${UrlBasePath.PROFILE}/settings`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}>
                                <ProfileSettingsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        // TODO: Add this to the url path -> /:serviceId
                        path={`/${UrlBasePath.PROFILE}/review/:bookingId`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}>
                                {/* <Review /> */}
                                <Review></Review>
                            </ProtectedRoute>
                        }
                    />
                    {/*Add and Edit Service Pages for Artist*/}
                    <Route
                        path={`/${UrlBasePath.PROFILE}/addService`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}>
                                <AddEditServicePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={`/${UrlBasePath.PROFILE}/editService/:serviceId`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}>
                                <AddEditServicePage isEdit />
                            </ProtectedRoute>
                        }
                    />
                    {/* booking related */}
                    <Route path="/booking/:bookingId" element={<BookingDetailsPage />} />
                    {/*requesting booking flow*/}
                    <Route path={`/${UrlBasePath.SERVICES}/:serviceId/request-booking`} element={<RequestBooking />} />
                    <Route path={`/${UrlBasePath.SERVICES}/:serviceId/booking-summary`} element={<BookingSummary />} />
                    <Route path={`/${UrlBasePath.SERVICES}/:serviceId/payment-details`} element={<PaymentDetails />} />
                    <Route path={`/${UrlBasePath.SERVICES}/:serviceId/booking-confirmation`} element={<BookingConfirmation />} />
                    {/*Request booking change*/}
                    <Route path={`/${UrlBasePath.SERVICES}/request-change/:bookingId`} element={<RequestChangeBooking />} />
                    {/* TODO: haven't implemented actual flow to get here yet */}
                    <Route path="/cancel-booking/:bookingId" element={<CancelBooking />} />
                    {/*<Route path={`/${UrlBasePath.PROFILE}/add-edit-post`}element={<AddEditPostPage/>}/>*/}
                    <Route
                        path={`/${UrlBasePath.PROFILE}/addPost`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}>
                                <AddEditPostPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={`/${UrlBasePath.PROFILE}/editPost/:postId`}
                        element={
                            <ProtectedRoute accessReq={RoutingAccess.SIGNED_IN_ONLY}>
                                <AddEditPostPage isEdit />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </Router>
    </div>
);
