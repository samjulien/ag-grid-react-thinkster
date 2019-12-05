import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelVisibility: true,
      columnDefs: [
        {
          headerName: 'Make',
          field: 'make',
          sortable: true,
          filter: true,
          checkboxSelection: true
        },
        {
          headerName: 'Model',
          field: 'model',
          sortable: true,
          filter: true
        },
        {
          headerName: 'Price',
          field: 'price',
          sortable: true,
          filter: true
        }
      ],
      rowData: []
    };
  }

  componentDidMount() {
    fetch('https://api.myjson.com/bins/15psn9')
      .then(result => result.json())
      .then(rowData => this.setState({ rowData }));
  }

  componentDidUpdate() {
    this.columnApi.setColumnVisible('model', this.state.modelVisibility);
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  };

  toggleModelColumn = () => {
    this.setState({ modelVisibility: !this.state.modelVisibility });
  };

  onButtonClick = () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataString = selectedData
      .map(node => `${node.make} ${node.model}`)
      .join(', ');
    alert(`Selected Nodes: ${selectedDataString}`);
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '500px',
          width: '600px'
        }}
      >
        <button type="button" onClick={this.onButtonClick}>
          Selected Rows
        </button>
        <button type="button" onClick={this.toggleModelColumn}>
          Toggle Model Column
        </button>
        <AgGridReact
          onGridReady={this.onGridReady}
          rowSelection="multiple"
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
