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
          width: 80,
        },
        {
          headerName: "First",
          field: "firstName",
        },
        {
          headerName: "Last",
          field: "lastName",
          colId: "lastName",
        },
        {
          headerName: "Acct #",
          field: "accountNumber",
        },
        {
          headerName: "Acct Name",
          field: "accountName",
          colId: "accountName",
        },
        {
          headerName: "Date Opened",
          field: "dateOpened",
          valueFormatter: function (params) {
            return new Date(params.value).toLocaleDateString();
          },
        },
        {
          headerName: "Amount",
          field: "amount",
          width: 140,
          comparator: (valueA, valueB) => {
            return +valueA - +valueB;
          },
        },
      ],
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true,
      },
      rowData: [],
      rowSelection: "multiple",
      rowDeselection: true,
    };
  }

  componentDidMount() {
    fetch("/api/accounts")
      .then((result) => result.json())
      .then((rowData) => this.setState({ rowData }));
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };

  onQuickFilterChanged = () => {
    this.gridApi.setQuickFilter(document.getElementById("quickFilter").value);
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "450px", width: "100%" }}
      >
        <input
          type="text"
          onInput={() => this.onQuickFilterChanged()}
          id="quickFilter"
          placeholder="Quick Filter"
        />
        <AgGridReact
          onGridReady={this.onGridReady}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          defaultColDef={this.state.defaultColDef}
          rowSelection={this.state.rowSelection}
          rowDeselection={this.state.rowDeselection}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
