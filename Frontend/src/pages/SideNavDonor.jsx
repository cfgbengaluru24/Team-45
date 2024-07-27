import React from "react";

export default function SideNavDonor() {
    //myProfile Handler
    const myProfile = () => {

    }
    //donate handler
  return (
    <div className="h-screen w-fit justify-center items-center space-y-5 flex flex-col rounded-lg bg-blue-500">
      <div className="w-36 space-y-6 text-center">
        <div>
          <button
        //    onClick={myProfile}
           >My Profile</button>
        </div>
        <div>
          <button 
        //   onClick={donate}
          >Donate</button>
        </div>
      </div>
    </div>
  );
}
