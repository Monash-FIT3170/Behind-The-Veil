import React from 'react';
// import { Link } from 'react-router-dom';
import Button from "../../../components/button/Button";

const ChooseAccountType = () => {
    return (
        <div>
            <h2>Choose Account Type</h2>
            <Button as={Link} to="/create-account?type=artist">
                I want to provide my services
            </Button>
            <Button as={Link} to="/create-account?type=bride">
                I want to make bookings for service
            </Button>
        </div>
    );
};

export default ChooseAccountType;