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
          field: "id",
          width: 60,
          lockPosition: true
        },
        {
          headerName: "First",
          field: "firstName"
        },
        {
          headerName: "Last",
          field: "lastName",
          sortable: true
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
          headerName: "Date Opened",
          field: "dateOpened",
          sortable: true
        },
        {
          headerName: "Amount",
          field: "amount",
          sortable: true,
          valueFormatter: function(params) {
            // Add a trailing zero
            return params.value.toFixed(2);
          }
        }
      ],
      defaultColDef: {
        resizable: true
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
    this.gridApi.sizeColumnsToFit();
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
