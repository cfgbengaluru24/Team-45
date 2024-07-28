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

export default function AgGrid({ width, height }) {
  useEffect(() => {
    const [rowData, setRowData] = useState();
    const getData = async () => {
      try {
        const response = axios.get("http://localhost:8080/v1/donors/requests");
        setRowData(
          response.map((data) => {
            return {
              request_id: data.request_id,
              type: data.type,
              Descrcription: data.details
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  });
  // request_id
  // type
  // details
  // cost
  // created_at

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "Sno" },
    { field: "Description", flex: 2 },
    { field: "Type", filter: true },
    { field: "Amount" },
    { field: "button", cellRenderer: CustomButtonComponent },
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
          style={{ height: "100vh", width: "85vw" }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </div>
      </div>
    </>
  );
}
