import ProfileDisplay from "./ProfileDisplay";
import React from "react";
import classNames from "classnames";
import ProfilePhoto from "./ProfilePhoto";

export const ProfileGalleryDisplay = ({
  className,
  imageData,
  userAlias,
  userUsername,
}) => {
  const classes = classNames(
    className,
    "flex grid grid-cols-3 gap-4 absolute bottom-0 pb-8 w-full"
    // "flex flex-col items-center justify-center"
  );
  return (
    // make up how it would be coded with the data
    <div className={classes}>
      <ProfilePhoto
        galleryImage={true}
        className="flex container h-full w-full"
        artistPhotoData={imageData}
      />
      <div className="col-span-2 flex flex-col items-center justify-center">
        <div className="text-center medium-text ">
          {userAlias ? userAlias : "User Alias"}
        </div>
        <div className="text-center small-text text-dark-grey">
          {userUsername ? "@" + userUsername : "@username"}
        </div>
      </div>
    </div>
  );
};
