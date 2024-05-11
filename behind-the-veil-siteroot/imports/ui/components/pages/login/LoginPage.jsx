/**
 * File Description: Sign-in page
 * File version: 1.0
 * Contributors: Kyle
 */

import React from 'react';
import {NavLink} from "react-router-dom";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import PersonIcon from "../../svgs/PersonIcon.jsx";
import KeyIcon from "../../svgs/KeyIcon.jsx";
import SignInImage from '../../images/SignInImage.jsx';

/**
 * Page where user can sign in to their account
 */
export const LoginPage = () => {
    return (
        // if window size is SMALLER than a large screen (default variable for large in tailwind lg:1024px),
        // then use center aligned and no visuals on the left so the inputs aren't all squished
        <WhiteBackground pageLayout={window.innerWidth <= 1024 ? PageLayout.SMALL_CENTER : PageLayout.SMALL_RIGHT}>

            <div className="hidden lg:flex translate-x-1/2 translate-y-[80vh]">
                

                {/*You might have to alter the above translation values or something to make sure that the visual
                doesn't move when changing screen size*/}

                <div style={{display: "flex", flexDirection: "column", gap: "100px", alignItems: "center", textAlign: "center"}}>

                    <div className="title-text text-secondary-purple-hover" style={{width: "400px"}}>Bridal Makeup & Services</div>

                    <SignInImage></SignInImage>

                </div>

            </div>

            <div>

                <div className="title-text" style={{textAlign: "center"}}>Sign In</div>

                <div style={{alignItems: "center", display: "flex", flexDirection: "column", gap: "10px", marginTop: "50px"}}>
                    <div style={{position: 'relative'}}>
                        <span style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)'}}>
                        <PersonIcon></PersonIcon>
                        </span>
                        <input type="text" placeholder="Username" style={{height: "30px", width: "300px", paddingLeft: '40px', outline: "1px solid lightgray", borderRadius: "3px"}} />
                    </div>

                    <div style={{position: 'relative'}}>
                        <span style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)'}}>
                        <KeyIcon></KeyIcon>
                        </span>
                        <input type="text" placeholder="Password" style={{height: "30px", width: "300px", paddingLeft: '40px', outline: "1px solid lightgray", borderRadius: "3px"}} />
                    </div>
                    
                    <div className="text-hyperlink-colour underline" style={{cursor: "pointer", marginLeft: "auto", marginRight: "75px"}}>Forgot password?</div>
                </div>

                <div style={{alignItems: "center", display: "flex", flexDirection: "column", gap: "10px", marginTop: "50px"}}>
                    <Button className="bg-secondary-purple hover:bg-secondary-purple-hover" style={{width: "150px"}}>Sign in</Button>

                    <NavLink to="/register"><Button style={{width: "150px"}}>Register</Button></NavLink>

                </div>

            </div>
        </WhiteBackground>
    );
};

export default LoginPage;


<div style={{ position: 'relative' }}>
    <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
        <img src="icon.png" alt="Icon" />
    </span>
    <input type="text" placeholder="Username" style={{ paddingLeft: '30px' }} />
</div>