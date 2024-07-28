import React, { useState } from "react";
import AgGrid from "./AgGid";
import SideNavDonor from "./SideNavDonor";
import UserInfo from "./DonorInfo";
import HistoryTable from "./HistoryTable";

export default function Combine() {
  const [mode, setMode] = useState("Profile");

  function handleChange(mode){
    setMode(mode);
    console.log(mode);
  }
  return (
    <div className="flex flex-row w-screen items-center space-x-2">
      <div className="w-fit">
        <SideNavDonor fun={handleChange} />
      </div>
      <div className="w-full">
        {mode === "Profile" && <UserInfo />}
        {mode === "Donate" && <AgGrid width="w-3/4" />}
        {mode === "DonateHistory" && <HistoryTable width="w-3/4"/>}
      </div>
    </div>
  );
}
