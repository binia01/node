import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ExploreActivitiesPage from './pages/ExploreActivitiesPage';
import QRCodeRedeemPage from './pages/QRCodeRedeemPage';
import FeedbackFormPage from './pages/FeedbackFormPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/signup" component={SignupPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/dashboard" component={DashboardPage} />
                        <Route path="/explore" component={ExploreActivitiesPage} />
                        <Route path="/redeem-qr" component={QRCodeRedeemPage} />
                        <Route path="/feedback" component={FeedbackFormPage} />
                    </Switch>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;