/**
 * File Description: Profile page
 * File version: 1.1
 * Contributors: Nikki
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import ProfileDisplay from "../../profilePhoto/ProfileDisplay";
import BrideProfileTabs from "./BrideProfileTabs";
import ArtistProfileTabs from "./ArtistProfileTabs";
import UrlBasePath from "../../../enums/UrlBasePath";
import { useUserInfo } from "../../util";

/**
 * The general profile page (changes for content depending on user type)
 */
export const ProfilePage = () => {
  const navigate = useNavigate();

  // get current user information
  const userInfo = useUserInfo();

  return (
    <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
      {/*Settings buttons*/}
      <div className="flex items-center justify-end w-full ">
        <Button
          className="flex flex-row justify-center items-center gap-x-1.5 sm:w-36"
          onClick={() => {
            navigate(`/${UrlBasePath.PROFILE}/settings`);
          }}
        >
          <Cog8ToothIcon className="icon-base" />
          <span className={"hidden sm:flex"}>Settings</span>
        </Button>
      </div>

      {/*Top div where user's info*/}
      <ProfileDisplay
        imageData={""}
        userAlias={userInfo.alias}
        userUsername={userInfo.username}
      />

      {/*bottom half where all the tabs are at - depends on the user type */}
      {userInfo.type === "bride" ? (
        <BrideProfileTabs userInfo={userInfo} />
      ) : userInfo.type === "artist" ? (
        <ArtistProfileTabs userInfo={userInfo} />
      ) : null}
    </WhiteBackground>
  );
};

export default ProfilePage;
