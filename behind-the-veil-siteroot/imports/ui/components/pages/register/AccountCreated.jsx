import React from 'react';
// import { Link } from 'react-router-dom';
import Button from "../../../components/button/Button";

const AccountCreated = () => {
    return (
        <div>
            <h2>Account Created</h2>
            <p>Please access the link sent to your email to activate your account!</p>
            <Button as={Link} to="/login">Return to Login</Button>
        </div>
    );
};

export default AccountCreated;