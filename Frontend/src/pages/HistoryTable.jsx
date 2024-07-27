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

export default function HistoryTable({ width, height }) {
  const [rowData, setRowData] = useState([]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "Sno" },
    { field: "Description", flex: 2 },
    { field: "Type", filter: true },
    { field: "ReceiptID", filter: true },
    { field: "Amount" },
    { field: "Date" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(""); // Replace with your API endpoint
        const data = response.data;
        setRowData(data.map((item, index) => ({
          Sno: index + 1,
          Description: item.description || '',
          Type: item.type,
          ReceiptID: item.receiptId,
          Amount: item.amount,
          Date: item.date
        })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <SideNavDonor />
      <div
        className="ag-theme-quartz"
        style={{ height: "100vh", width: "85vw" }}
      >
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
}
