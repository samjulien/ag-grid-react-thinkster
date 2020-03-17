import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
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
          sortable: true,
          filter: "agTextColumnFilter",
          filterParams: {
            filterOptions: ["contains", "notContains"],
            suppressAndOrCondition: true,
            caseSensitive: true,
            debounceMs: 0
          }
        },
        {
          headerName: "Acct #",
          field: "accountNumber"
        },
        {
          headerName: "Acct Name",
          field: "accountName",
          filter: "agSetColumnFilter"
        },
        {
          headerName: "Date Opened",
          field: "dateOpened",
          sortable: true,
          filter: "agDateColumnFilter",
          filterParams: {
            comparator: function(filterLocalDateAtMidnight, cellValue) {
              if (cellValue === null) return -1;
              let cellDate = new Date(cellValue);
              if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
              }
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }
              if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
            },
            browserDatePicker: true
          }
        },
        {
          headerName: "Amount",
          field: "amount",
          filter: "agNumberColumnFilter",
          filterParams: {
            defaultOption: "inRange",
            inRangeInclusive: true,
            applyButton: true
          },
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

  handleQuickFilter = event => {
    this.gridApi.setQuickFilter(event.target.value);
  };

  moFilter = () => {
    // get the instance of the filter on each column
    const lastNameFilter = this.gridApi.getFilterInstance("lastName");
    const amountFilter = this.gridApi.getFilterInstance("amount");
    // set the filter model
    lastNameFilter.setModel({
      type: "contains",
      filter: "Mo"
    });
    amountFilter.setModel({
      type: "lessThan",
      filter: 100
    });
    // sort the grid
    this.gridApi.setSortModel([{ colId: "amount", sort: "desc" }]);
    // tell ag-Grid to update the filters
    this.gridApi.onFilterChanged();
  };

  checkingAndSavings = () => {
    const accountNameFilter = this.gridApi.getFilterInstance("accountName");
    accountNameFilter.selectNothing();
    accountNameFilter.selectValue("Checking Account");
    accountNameFilter.selectValue("Savings Account");
    accountNameFilter.applyModel();
    this.gridApi.setSortModel([{ colId: "lastName", sort: "asc" }]);
    this.gridApi.onFilterChanged();
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "450px", width: "100%" }}
      >
        <input
          type="text"
          placeholder="Quick Filter"
          onChange={this.handleQuickFilter}
        />
        <button type="button" onClick={this.moFilter}>
          Mo Filter
        </button>
        <button type="button" onClick={this.checkingAndSavings}>
          Checking and Savings
        </button>
        <AgGridReact
          onGridReady={this.onGridReady}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          floatingFilter={true}
          defaultColDef={this.state.defaultColDef}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
