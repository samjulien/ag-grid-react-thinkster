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
          checkboxSelection: true,
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
      },
      rowData: [],
      sortingOrder: ["desc", "asc", null],
      multiSortKey: "ctrl",
      rowDragManaged: true,
      animateRows: true,
      suppressRowDrag: false,
      pinnedTopRowData: [],
      rowHeight: 40,
      getRowHeight: (params) => {
        return params.node.data.amount > 500 ? 50 : 30;
      },
    };
  }

  componentDidMount() {
    fetch("/api/accounts")
      .then((result) => result.json())
      .then((rowData) => this.setState({ rowData }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.suppressRowDrag !== this.state.suppressRowDrag) {
      this.gridApi.setSuppressRowDrag(this.state.suppressRowDrag);
    }
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };

  toggleRowDrag = () => {
    this.setState({ suppressRowDrag: !this.state.suppressRowDrag });
  };

  sortByAccountAndName = () => {
    const sort = [
      {
        colId: "accountName",
        sort: "asc",
      },
      {
        colId: "lastName",
        sort: "asc",
      },
    ];

    this.gridApi.setSortModel(sort);
  };

  onSelectionChanged = () => {
    const selected = this.gridApi.getSelectedRows();
    this.gridApi.setPinnedBottomRowData(selected);
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "450px", width: "99%" }}
      >
        <button type="button" onClick={this.sortByAccountAndName}>
          Sort By Account and Last Name
        </button>
        <button type="button" onClick={this.toggleRowDrag}>
          Toggle Row Drag
        </button>
        <AgGridReact
          onGridReady={this.onGridReady}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          defaultColDef={this.state.defaultColDef}
          sortingOrder={this.state.sortingOrder}
          multiSortKey={this.state.multiSortKey}
          rowDragManaged={this.state.rowDragManaged}
          animateRows={this.state.animateRows}
          pinnedTopRowData={this.state.pinnedTopRowData}
          onSelectionChanged={this.onSelectionChanged}
          rowHeight={this.state.rowHeight}
          getRowHeight={this.state.getRowHeight}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
