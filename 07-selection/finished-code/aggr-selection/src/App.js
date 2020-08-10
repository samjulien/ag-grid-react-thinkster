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
          headerCheckboxSelection: function (params) {
            const displayedColumns = params.columnApi.getAllDisplayedColumns();
            return displayedColumns[0] === params.column;
          },
          headerCheckboxSelectionFilteredOnly: true,
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
        checkboxSelection: function (params) {
          const displayedColumns = params.columnApi.getAllDisplayedColumns();
          return displayedColumns[0] === params.column;
        },
      },
      rowData: [],
      rowSelection: "multiple",
      rowDeselection: true,
      suppressRowClickSelection: true,
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

  onRowSelected = (event) => {
    console.log(event);
  };

  onSelectionChanged = (event) => {
    console.log(event);
  };

  selectCreditCards = () => {
    this.gridApi.forEachNode((node) => {
      node.setSelected(node.data.accountName === "Credit Card Account");
    });
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
        <button type="button" onClick={() => this.gridApi.selectAll()}>
          Select All
        </button>
        <button type="button" onClick={() => this.gridApi.deselectAll()}>
          Deselect All
        </button>
        <button type="button" onClick={() => this.gridApi.selectAllFiltered()}>
          Select All Filtered
        </button>
        <button
          type="button"
          onClick={() => this.gridApi.deselectAllFiltered()}
        >
          Deselect All Filtered
        </button>
        <button type="button" onClick={this.selectCreditCards}>
          Select Credit Cards
        </button>
        <AgGridReact
          onGridReady={this.onGridReady}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          defaultColDef={this.state.defaultColDef}
          rowSelection={this.state.rowSelection}
          rowDeselection={this.state.rowDeselection}
          suppressRowClickSelection={this.state.suppressRowClickSelection}
          onRowSelected={this.onRowSelected}
          onSelectionChanged={this.onSelectionChanged}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
