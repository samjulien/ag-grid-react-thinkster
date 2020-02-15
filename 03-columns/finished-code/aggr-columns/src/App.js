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
          headerName: "Personal Information",
          groupId: "PersonalGroup",
          children: [
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
              colId: "lastName"
            },
            {
              headerName: "Avatar",
              field: "avatar",
              cellRenderer: ({ value }) =>
                `<img style="height: 14px; width: 14px" src=${value} />`,
              maxWidth: 60,
              headerTooltip: "Customer Avatar"
            },
            {
              headerName: "Company",
              field: "company",
              columnGroupShow: "open"
            },
            {
              headerName: "Title",
              field: "title",
              columnGroupShow: "open"
            }
          ]
        },
        {
          headerName: "Address",
          groupId: "AddressGroup",
          marryChildren: true,
          children: [
            {
              headerName: "Street",
              field: "streetAddress",
              columnGroupShow: "open"
            },
            {
              headerName: "City",
              field: "city",
              suppressMovable: true
            },
            {
              headerName: "State",
              field: "state",
              suppressMovable: true
            },
            {
              headerName: "Zip",
              field: "zip",
              columnGroupShow: "open"
            }
          ]
        },
        {
          headerName: "Account Information",
          groupId: "AccountGroup",
          marryChildren: true,
          children: [
            {
              headerName: "Acct #",
              field: "accountNumber",
              columnGroupShow: "open"
            },
            {
              headerName: "Acct Name",
              field: "accountName"
            },
            {
              headerName: "Amount",
              field: "amount"
            }
          ]
        }
      ],
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true
      },
      colResizeDefault: "shift",
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
    var columnIds = [];
    this.columnApi.getAllColumns().forEach(column => {
      columnIds.push(column.colId);
    });
    this.columnApi.autoSizeColumns(columnIds);
  };

  toggleExpansion = expand => {
    let groupNames = ["PersonalGroup", "AddressGroup", "AccountGroup"];
    groupNames.forEach(groupId => {
      this.columnApi.setColumnGroupOpened(groupId, expand);
    });
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "450px", width: "100%" }}
      >
        <button type="button" onClick={() => this.gridApi.setHeaderHeight(20)}>
          Set Header to 20px
        </button>
        <button type="button" onClick={() => this.gridApi.setHeaderHeight(50)}>
          Set Header to 50px
        </button>
        <button type="button" onClick={() => this.toggleExpansion(true)}>
          Expand All
        </button>
        <button type="button" onClick={() => this.toggleExpansion(false)}>
          Collapse All
        </button>
        <button
          type="button"
          onClick={() => this.columnApi.setColumnPinned("lastName", "left")}
        >
          Pin Last Name to Left
        </button>
        <button
          type="button"
          onClick={() => this.columnApi.setColumnPinned("lastName", null)}
        >
          Unpin Last Name
        </button>
        <AgGridReact
          onGridReady={this.onGridReady}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          colResizeDefault={this.state.colResizeDefault}
          defaultColDef={this.state.defaultColDef}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
