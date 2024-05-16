/**
 * File Description: Visual for login/register page left side
 * File version: 1.1
 * Contributors: Kyle, Nikki
 */
import React from 'react';

/**
 * Image visual and text displayed on the left side of the register/login screens
 */
export const LoginRegisterVisual = () => {
    return (
        <div className={"hidden lg:flex flex-col items-center justify-center gap-y-10 translate-x-[10%] fixed left-0"}>
            <div className="title-text text-center text-secondary-purple-hover w-[450px] ">
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