import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import NameFieldComponent from "./NameFieldComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelVisibility: true,
      columnDefs: [
        {
          headerName: "Name",
          field: "name",
          cellRenderer: "nameFieldComponent"
        },
        {
          headerName: "Avatar",
          field: "avatar",
          width: 100,
          cellRenderer: ({ value }) =>
            `<img style="height: 14px; width: 14px" src=${value} />`
        },
        {
          headerName: "Address",
          valueGetter: ({ data }) =>
            `${data.address.street1} ${data.address.city}, ${data.address.state} ${data.address.zip}`
        }
      ],
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true
      },
      rowData: [],
      frameworkComponents: {
        nameFieldComponent: NameFieldComponent
      }
    };
  }

  componentDidMount() {
    fetch("/api/customers")
      .then(result => result.json())
      .then(rowData => this.setState({ rowData }));
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };

  render() {
    return (
      <div className="ag-theme-balham" style={{ height: "800px" }}>
        <AgGridReact
          onGridReady={this.onGridReady}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          defaultColDef={this.state.defaultColDef}
          frameworkComponents={this.state.frameworkComponents}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
