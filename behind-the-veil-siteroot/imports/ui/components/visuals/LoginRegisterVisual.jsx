/**
 * File Description: Visual for login/register page left side
 * File version: 1.0
 * Contributors: Kyle
 */
import React from 'react';

/**
 * Image visual and text displayed on the left side of the register/login screens
 */
export const LoginRegisterVisual = () => {
    return (
        <div className={"absolute flex flex-col gap-8 items-center text-center ml-2 xl:ml-12 " +
            "lg:-top-[600px] xl:-top-[500px] 2xl:-top-64"}>
            <div className="title-text text-secondary-purple-hover w-[450px]">
                Bridal Makeup & Services
            </div>

            {/* The image displayed on the left-hand side of the screen. */}
            <img src="/images/SignIn.png"
                 className={"lg:h-[300px] xl:h-[400px] 2xl:h-[450px]"}
                 alt={"Makeup image"}></img>
        </div>
    );
}

export default LoginRegisterVisual;