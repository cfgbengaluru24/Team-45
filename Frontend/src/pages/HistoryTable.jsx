import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SideNavDonor from "./SideNavDonor";

const CustomButtonComponent = (props) => {
  const clickHandler = () => {
    alert("Hello");
  };
  return (
    <button className="rounded-lg bg-blue-400 w-full" onClick={clickHandler}>
      Donate Now
    </button>
  );
};

export default function HistoryTable({width, height}) {
  const [rowData, setRowData] = useState([
    { Sno: "1", Description: "10 Tables needed", Type: "Infra", Amount: 6000 },
    { Sno: "2", Type: "Scholarship", Amount: 60000 },
    { Sno: "3", Type: "Infra", Amount: 76000 },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "Sno" },
    { field: "Description", flex: 2 },
    { field: "Type", filter: true },
    { field: "Receipt ID", filter: true },
    { field: "Amount" },
    { field: "Date"},
  ]);

  // useEffect(() => {
  //     const data = axios.get("/api/getData");

  //     setColDefs(data.map({
  //         Sno: data.number,
  //         Type: data.type,
  //         Amount: data.Amount,
  //     }))
  // }, [])

  return (
    // wrapping container with theme & size
    <>
      <div>
        <div
          className="ag-theme-quartz "
          style={{ height: "100vh" , width: "85vw"}} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </div>
      </div>
    </>
  );
}
