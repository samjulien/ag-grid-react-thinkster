import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class FileView extends Component {
  colDefs = [
    { field: "id", checkboxSelection: true, filter: "agNumberColumnFilter" },
    { field: "file", filter: "agTextColumnFilter" },
    { field: "size", filter: "agNumberColumnFilter" }
  ];
  defaultColDef = { sortable: true };

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  render() {
    return (
      <div id="myGrid" style={{ height: 450 }} className="ag-theme-balham">
        <AgGridReact
          columnDefs={this.colDefs}
          onGridReady={this.onGridReady}
          defaultColDef={this.defaultColDef}
          rowSelection={"multiple"}
          onFirstDataRendered={params => params.api.sizeColumnsToFit()}
        ></AgGridReact>
      </div>
    );
  }
}

export default FileView;
