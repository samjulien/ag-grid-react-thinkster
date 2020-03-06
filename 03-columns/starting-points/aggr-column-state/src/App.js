import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "./actions/columnActions";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class App extends Component {
  rowData = [
    {
      id: 1,
      athlete: "Michael Phelps",
      age: 23,
      year: 2008,
      date: "24/08/2008",
      sport: "Swimming"
    },
    {
      id: 2,
      athlete: "Michael Phelps",
      age: 19,
      year: 2004,
      sport: "Swimming"
    },
    {
      id: 3,
      athlete: "Michael Phelps",
      age: 27,
      year: 2012,
      sport: "Swimming"
    },
    {
      id: 4,
      athlete: "Natalie Coughlin",
      age: 25,
      year: 2008,
      sport: "Swimming"
    },
    {
      id: 5,
      athlete: "Aleksey Nemov",
      age: 24,
      year: 2000,
      sport: "Gymnastics"
    }
  ];

  render() {
    return (
      <div id="myGrid" style={{ height: 450 }} className="ag-theme-balham">
        <AgGridReact
          columnDefs={this.props.columnDefs}
          rowData={this.rowData}
          deltaColumnMode={true}
          getRowNodeId={data => data.id}
        ></AgGridReact>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  columnDefs: state.columnDefs
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
