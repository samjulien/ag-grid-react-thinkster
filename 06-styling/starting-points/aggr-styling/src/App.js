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
          lockPosition: true,
          rowDrag: true,
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
      rowDragManaged: true,
      animateRows: true,
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

  updateRowData = () => {
    var itemsToUpdate = [];
    this.gridApi.forEachNode((rowNode) => {
      var data = rowNode.data;
      data.amount = this.randomAmount(1, 1000);
      itemsToUpdate.push(data);
    });
    this.gridApi.updateRowData({ update: itemsToUpdate });
  };

  randomAmount = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
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
          rowDragManaged={this.state.rowDragManaged}
          animateRows={this.state.animateRows}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
