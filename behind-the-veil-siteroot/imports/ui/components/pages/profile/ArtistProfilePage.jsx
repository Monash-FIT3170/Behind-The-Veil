/**
 * File Description: Artist Profile 
 * File version: 1.0
 * Contributors: Kefei (Phillip) Li
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout.tsx";
import Tabs from "../../tabs/Tabs.jsx";
import ProfilePhoto from "../../profilePhoto/ProfilePhoto.jsx"
import Button from "../../button/Button.jsx";
/**
 * Page for artist profile
 */
export const ArtistProfilePage = () => {
  const plusIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>

  )

    // Photos: https://www.material-tailwind.com/docs/react/gallery
    // Probably a good idea to make this a component?
    const galleryTab = (
    <div>
      <div className = "sticky top-20 z-20 flex justify-end">
        <Button className = "absolute top-5 flex bg-secondary-purple hover:bg-secondary-purple-hover">
          {plusIcon} Add Photo
        </Button>
        </div>
    <div className = "px-10 relative flex flex-col gap-3">   
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
    <div className="grid gap-4">
      <div>
        <img
          className="h-auto max-w-full rounded-lg object-cover object-center"
          src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="gallery-photo"
        />
      </div>
      <div>
        <img
          className="h-auto max-w-full rounded-lg object-cover object-center "
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
          alt="gallery-photo"
        />
      </div>
      <div>
        <img
          className="h-auto max-w-full rounded-lg object-cover object-center"
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="gallery-photo"
        />
      </div>
    </div>
    <div className="grid gap-4">
      <div>
        <img
          className="h-auto max-w-full rounded-lg object-cover object-center"
          src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="gallery-photo"
        />
      </div>
      <div>
        <img
          className="h-auto max-w-full rounded-lg object-cover object-center"
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="gallery-photo"
        />
      </div>
      <div>
        <img
          className="h-auto max-w-full rounded-lg object-cover object-center "
          src="https://docs.material-tailwind.com/img/team-3.jpg"
          alt="gallery-photo"
        />
      </div>
    </div>
    <div className="grid gap-4">
      <div>
        <img
          className="h-auto max-w-full rounded-lg object-cover object-center"
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="gallery-photo"
        />
      </div>
      <div>
        <img
          className="h-auto max-w-full rounded-lg object-cover object-center "
          src="https://docs.material-tailwind.com/img/team-3.jpg"
          alt="gallery-photo"
        />
      </div>
      <div>
        <img
          className="h-auto max-w-full rounded-lg object-cover object-center"
          src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="gallery-photo"
        />
      </div>
    </div>
    <div className="grid gap-4">
      <div>
        <img
          className="h-auto max-w-full rounded-lg object-cover object-center"
          src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="gallery-photo"
        />
      </div>
      <div>
        <img
          className="h-auto max-w-full rounded-lg object-cover object-center"
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
          alt="gallery-photo"
        />
      </div>
    </div>
  </div>
  </div>
  </div>
    )

    //import
    const gearIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>

    )



    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
          <div className = "flex justify-end">
          <Button className = "flex"> {gearIcon} Settings</Button>
          </div>
            <ProfilePhoto
                className = "flex container mx-auto"
            />
            <div className = "text-center main-text">
              Name
            </div>
            <div className = "text-center main-text">
              Tag
            </div>
            <Tabs
                tabs={['Dashboard', 'Bookings', 'My Services', 'Gallery', 'Reviews' ]}
                tabPanels={[
                    'Dashboard Panel', 
                    'Bookings Panel', 
                    'My Services Panel', 
                    galleryTab, 
                    'Reviews Panel']}
                tabsClassName= "flex justify-between"
                tabPanelsClassName = "relative flex justify-around" 
            />
        </WhiteBackground>
    );
};

export default ArtistProfilePage;