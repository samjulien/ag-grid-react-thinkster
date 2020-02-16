import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "Jan",
          field: "jan",
          cellClassRules: this.cellClassRules,
          colSpan: params => {
            if (this.isHeaderRow(params)) {
              return 6;
            } else if (this.isQuarterRow(params)) {
              return 3;
            } else {
              return 1;
            }
          }
        },
        {
          headerName: "Feb",
          field: "feb"
        },
        {
          headerName: "Mar",
          field: "mar"
        },
        {
          headerName: "Apr",
          field: "apr",
          cellClassRules: this.cellClassRules,
          colSpan: params => {
            if (this.isQuarterRow(params)) {
              return 3;
            } else {
              return 1;
            }
          }
        },
        {
          headerName: "May",
          field: "may"
        },
        {
          headerName: "Jun",
          field: "jun"
        }
      ],
      rowData: [
        {
          section: "big-title",
          jan: "Warehouse 1"
        },
        {
          section: "quarters",
          jan: "Q1",
          apr: "Q2"
        },
        {
          jan: 534,
          feb: 612,
          mar: 243,
          apr: 231,
          may: 428,
          jun: 231
        },
        {
          jan: 765,
          feb: 146,
          mar: 243,
          apr: 231,
          may: 428,
          jun: 231
        },
        {
          jan: 335,
          feb: 122,
          mar: 243,
          apr: 231,
          may: 428,
          jun: 231
        },
        {
          jan: 35,
          feb: 342,
          mar: 243,
          apr: 231,
          may: 428,
          jun: 231
        },
        {
          jan: 568,
          feb: 531,
          mar: 243,
          apr: 231,
          may: 428,
          jun: 231
        },
        {
          jan: 365,
          feb: 361,
          mar: 243,
          apr: 231,
          may: 428,
          jun: 231
        },
        {
          section: "big-title",
          jan: "Warehouse 2"
        },
        {
          section: "quarters",
          jan: "Q1",
          apr: "Q2"
        },
        {
          jan: 21,
          feb: 12,
          mar: 24,
          apr: 31,
          may: 28,
          jun: 31
        },
        {
          jan: 21,
          feb: 12,
          mar: 24,
          apr: 31,
          may: 28,
          jun: 31
        },
        {
          jan: 21,
          feb: 12,
          mar: 24,
          apr: 31,
          may: 28,
          jun: 31
        },
        {
          jan: 21,
          feb: 12,
          mar: 24,
          apr: 31,
          may: 28,
          jun: 31
        },
        {
          jan: 2,
          feb: 32,
          mar: 24,
          apr: 31,
          may: 48,
          jun: 21
        },
        {
          jan: 21,
          feb: 12,
          mar: 24,
          apr: 31,
          may: 28,
          jun: 31
        }
      ],
      getRowHeight: params => {
        return this.isHeaderRow(params) ? 40 : 25;
      },
      defaultColDef: { width: 100, resizable: true }
    };
  }

  cellClassRules = {
    "header-cell": 'data.section === "big-title"',
    "quarters-cell": 'data.section === "quarters"'
  };

  isHeaderRow = params => {
    return params.data.section === "big-title";
  };

  isQuarterRow = params => {
    return params.data.section === "quarters";
  };

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "500px",
            width: "1000px"
          }}
          className="ag-theme-balham"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            getRowHeight={this.state.getRowHeight}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

export default App;
