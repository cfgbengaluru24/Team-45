import React from "react";
import AgGrid from "./AgGid";
import SideNavDonor from "./SideNavDonor";

export default function Combine() {
  return (
    <div className="flex flex-row w-screen items-center space-x-2">
      <div className="w-fit ">
        <SideNavDonor />
      </div>
      <div>
        <AgGrid width="w-3/4"/>
      </div>
    </div>
  );
}
