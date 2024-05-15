import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import NavigationBar from "./components/navigationBar/NavigationBar.jsx";
import LoggedInOnlyRoute from "./components/protectedRoute/LoggedInOnlyRoute.jsx";
import LoggedOutOnlyRoute from "./components/protectedRoute/LoggedOutOnlyRoute.jsx";

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
import AccountActivatedPage from "./components/pages/register/AccountActivatedPage";
import CreateAccountPage from "./components/pages/register/CreateAccountPage";
import ActivateAccountPage from "./components/pages/register/ActivateAccountPage";
import BookingSummary from "./components/pages/request-booking/BookingSummary";

export const App = () => (
    <div>
        {/*This is the navigation bar on every Page*/}
        <Router>
            <NavigationBar/>
            <main className="main-content">
                <Routes>
          <Route path="/examples" element={<Examples />} />{" "}
          {/* removed once dev is finished*/}
          {/*routes that any user can access*/}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service/:serviceId" element={<SpecificServicePage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          {/*routes that NOT authenticated users can access*/}
          <Route
            path="/login"
            element={
              <LoggedOutOnlyRoute>
                <LoginPage />
              </LoggedOutOnlyRoute>
            }
          />
          <Route
            path="/register"
            element={
              <LoggedOutOnlyRoute>
                <RegisterPage />
              </LoggedOutOnlyRoute>
            }
          />
          <Route
            path="/register/createAccount/"
            element={
              <LoggedOutOnlyRoute>
                <CreateAccountPage/>
              </LoggedOutOnlyRoute>
            }
          />
          <Route
            path="/register/activateAccount"
            element={
              <LoggedOutOnlyRoute>
                <ActivateAccountPage/>
              </LoggedOutOnlyRoute>
            }
          />
          <Route
            path="/register/accountActivated"
            element={
              <LoggedOutOnlyRoute>
                <AccountActivatedPage/>
              </LoggedOutOnlyRoute>
            }
          />
          {/*routes that ONLY authenticated users can access*/}
          <Route
            path="/messages"
            element={
              <LoggedInOnlyRoute>
                {" "}
                <MessagesPage />
              </LoggedInOnlyRoute>
            }
          />
          {/* todo: not made account pages (bride and artist) thus, todo later*/}
          <Route
            path="/account"
            element={
              <LoggedInOnlyRoute>
                {" "}
                <MessagesPage />
              </LoggedInOnlyRoute>
            }
          />
          {/* Have to add in LoggedInOnlyRoute */}
          <Route path="/artist-profile" element={<ArtistProfilePage />} />
          {/* TODO: haven't implemented actual flow to get here yet */}
          <Route path="/request-booking" element={<RequestBooking />} />
          {/* Define other routes that you need*/}
          <Route path="/service-area" element={<ArtistServiceArea />} />

                    {/* removed once dev is finished*/}
                    <Route path="/examples" element={<Examples/>}/>

                    {/*routes that any user can access*/}
                    <Route path="/" element={<HomePage/>}/>

                    <Route path="/services" element={<ServicesPage/>}/>
                    <Route path="/service/:serviceId" element={<SpecificServicePage/>}/>

                    <Route path="/artists" element={<ArtistsPage/>}/>

                    {/*routes that NOT authenticated users can access*/}
                    <Route
                        path="/login"
                        element={
                            <LoggedOutOnlyRoute>
                                <LoginPage/>
                            </LoggedOutOnlyRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <LoggedOutOnlyRoute>
                                <RegisterPage/>
                            </LoggedOutOnlyRoute>
                        }
                    />
                    <Route
                        path="/register/createAccount/"
                        element={
                            <LoggedOutOnlyRoute>
                                <CreateAccountPage/>
                            </LoggedOutOnlyRoute>
                        }
                    />
                    <Route
                        path="/register/activateAccount"
                        element={
                            <LoggedOutOnlyRoute>
                                <ActivateAccountPage/>
                            </LoggedOutOnlyRoute>
                        }
                    />
                    <Route
                        path="/register/accountActivated"
                        element={
                            <LoggedOutOnlyRoute>
                                <AccountActivatedPage/>
                            </LoggedOutOnlyRoute>
                        }
                    />

                    <Route
                        path="/forgot-password"
                        element={<LoggedOutOnlyRoute><ForgotPasswordPage/></LoggedOutOnlyRoute>}
                    />
                    <Route
                        path="/reset-password/:token"
                        element={<LoggedOutOnlyRoute><ResetPasswordPage/></LoggedOutOnlyRoute>}
                    />

                    <Route
                        path="/reset-complete"
                        element={<LoggedOutOnlyRoute><ResetCompletePage/></LoggedOutOnlyRoute>}
                    />

                    {/*routes that ONLY authenticated users can access*/}
                    <Route
                        path="/messages"
                        element={
                            <LoggedInOnlyRoute>
                                <MessagesPage/>
                            </LoggedInOnlyRoute>
                        }
                    />

                    <Route
                        path="/account"
                        element={
                            <LoggedInOnlyRoute>
                                <MessagesPage/>
                            </LoggedInOnlyRoute>
                        }
                    />

                    <Route path="/artist-profile/:username" element={<ArtistProfilePage/>}/>

                    {/* TODO: haven't implemented actual flow to get here yet */}
                    <Route path="/request-booking" element={<RequestBooking/>}/>
                    <Route path="/service-area" element={<ArtistServiceArea/>}/>
                    <Route path="/cancel-booking" element={<CancelBooking/>}/>
                    <Route path="/booking-summary" element={<BookingSummary/>} />

                </Routes>
            </main>
        </Router>
    </div>
);
