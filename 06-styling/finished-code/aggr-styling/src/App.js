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
          icons: {
            sortAscending: '<i class="fa fa-sort-alpha-up" />',
            sortDescending: '<i class="fa fa-sort-alpha-down" />',
            menu: '<i class="fa fa-caret-square-down" />',
          },
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
          cellClassRules: {
            "ag-red": "x <= 100",
            "ag-amber": "x > 100 && x <= 200",
            "ag-green": "x >= 700",
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
      domLayout: null,
      style: {
        height: "600px",
        width: "600px",
      },
      icons: {
        sortAscending: '<i class="fa fa-sort-alpha-up" />',
        sortDescending: '<i class="fa fa-sort-alpha-down" />',
        menu: '<i class="fa fa-compass" />',
        rowDrag: '<i class="fa fa-dragon" />',
      },
      // rowClassRules: {
      //   "ag-green": "data.amount > 700",
      //   "ag-amber": "data.amount > 100 && data.amount <= 200",
      //   "ag-red": "data.amount <= 100",
      // },
    };
  }

  componentDidMount() {
    fetch("/api/accounts")
      .then((result) => result.json())
      .then((rowData) => this.setState({ rowData: rowData.slice(0, 50) }));
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.domLayout !== this.state.domLayout) {
      if (this.state.domLayout === "print") {
        this.setState({ style: { height: "", width: "" } });
      } else if (this.state.domLayout === null) {
        this.setState({ style: { height: "600px", width: "600px" } });
      }
      this.gridApi.setDomLayout(this.state.domLayout);
    }
  };

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.gridApi.sizeColumnsToFit();
  };

  resizeGrid = () => {
    this.setState({
      style: {
        height: "400px",
      },
    });
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

  setPrintFriendly = () => {
    this.setState({ domLayout: "print" });
  };

  setNormal = () => {
    this.setState({ domLayout: null });
  };

  render() {
    return (
      <div className="ag-theme-balham" style={this.state.style}>
        <button type="button" onClick={this.setNormal}>
          Normal
        </button>
        <button type="button" onClick={this.updateRowData}>
          Update Amounts
        </button>
        <button type="button" onClick={this.resizeGrid}>
          Resize Grid
        </button>
        <button type="button" onClick={this.setPrintFriendly}>
          Print Friendly
        </button>
        <AgGridReact
          onGridReady={this.onGridReady}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          defaultColDef={this.state.defaultColDef}
          rowDragManaged={this.state.rowDragManaged}
          animateRows={this.state.animateRows}
          rowClassRules={this.state.rowClassRules}
          icons={this.state.icons}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
