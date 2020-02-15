import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelVisibility: true,
      columnDefs: [
        {
          headerName: "ID",
          field: "id"
        },
        {
          headerName: "First",
          field: "firstName"
        },
        {
          headerName: "Last",
          field: "lastName"
        },
        {
          headerName: "Avatar",
          field: "avatar",
          cellRenderer: ({ value }) =>
            `<img style="height: 14px; width: 14px" src=${value} />`
        },
        {
          headerName: "Company",
          field: "company"
        },
        {
          headerName: "Title",
          field: "title"
        },
        {
          headerName: "Street",
          field: "streetAddress"
        },
        {
          headerName: "City",
          field: "city"
        },
        {
          headerName: "State",
          field: "state"
        },
        {
          headerName: "Zip",
          field: "zip"
        },
        {
          headerName: "Acct #",
          field: "accountNumber"
        },
        {
          headerName: "Acct Name",
          field: "accountName"
        },
        {
          headerName: "Amount",
          field: "amount"
        }
      ],
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true
      },
      rowData: []
    };
  }

  componentDidMount() {
    fetch("/api/accounts")
      .then(result => result.json())
      .then(rowData => this.setState({ rowData }));
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "450px", width: "100%" }}
      >
        <AgGridReact
          onGridReady={this.onGridReady}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          defaultColDef={this.state.defaultColDef}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
