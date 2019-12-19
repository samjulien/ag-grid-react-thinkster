import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "./actions/fileActions";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class FileView extends Component {
  colDefs = [
    { field: "id", checkboxSelection: true, filter: "agNumberColumnFilter" },
    { field: "file", filter: "agTextColumnFilter" },
    { field: "size", filter: "agNumberColumnFilter" }
  ];
  defaultColDef = { sortable: true };

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  addSize = () => {
    this.props.actions.addSize();
  };

  randomSize = () => {
    this.props.actions.randomSize();
  };

  newFile = () => {
    this.props.actions.newFile();
  };

  deleteFiles = () => {
    let ids = [];
    this.gridApi.forEachNode(node => {
      if (node.isSelected()) {
        ids.push(node.data.id);
      }
    });
    this.props.actions.deleteFiles(ids);
  };

  render() {
    return (
      <div id="myGrid" style={{ height: 450 }} className="ag-theme-balham">
        <button onClick={() => this.addSize()}>Add 1 Size to Even Ids</button>
        <button onClick={() => this.randomSize()}>Randomize Sizes</button>
        <button onClick={() => this.newFile()}>Add File</button>
        <button onClick={() => this.deleteFiles()}>Delete Files</button>
        <AgGridReact
          rowData={this.props.files}
          deltaRowMode={true}
          getRowNodeId={data => data.id}
          columnDefs={this.colDefs}
          onGridReady={this.onGridReady}
          defaultColDef={this.defaultColDef}
          rowSelection={"multiple"}
          onFirstDataRendered={params => params.api.sizeColumnsToFit()}
        ></AgGridReact>
      </div>
    );
  }
}

const mapStateToProps = state => ({ files: state.files });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FileView);
