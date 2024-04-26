/**
 * File Description: Sign-in page
 * File version: 1.0
 * Contributors: Kyle
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";

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
                <div className="title-text text-secondary-purple-hover">Bridal Makeup & Services</div>


            </div>

            <div style={{textAlign: "center", display: "flex", flexDirection: "column", gap: "30px", alignItems: "center"}}>


                <div className="title-text">Sign In</div>

                <div style={{position: 'relative'}}>
                    <span style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                    </span>
                    <input type="text" placeholder="Username" style={{paddingLeft: '40px', outline: "1px solid lightgray", borderRadius: "5px"}} />
                </div>

                <div style={{position: 'relative'}}>
                    <span style={{position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray">
                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>
                    </span>
                    <input type="text" placeholder="Password" style={{paddingLeft: '40px', outline: "1px solid lightgray", borderRadius: "5px"}} />
                </div>
                
                <div className="text-hyperlink-colour underline">Forgot password?</div>

                <Button className="bg-secondary-purple hover:bg-secondary-purple-hover" style={{width: "150px"}}>Sign in</Button>

                <Button style={{width: "150px"}}>Register</Button>


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