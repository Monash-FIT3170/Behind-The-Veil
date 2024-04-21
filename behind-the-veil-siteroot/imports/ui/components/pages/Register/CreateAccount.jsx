import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import Button from "../../../components/button/Button";

const CreateAccount = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [preferredName, setPreferredName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Yet to add logic to handle form submission (e.g., API call to create account)
        // Yet to add redirect to Account Created page after successful registration
        history.push('/account-created');
    };

    return (
        <div className="flex flex-col gap-5 p-10">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Preferred Name"
                    value={preferredName}
                    onChange={(e) => setPreferredName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <Button type="submit">Register</Button>
            </form>
        </div>
    );
};

export default CreateAccount;