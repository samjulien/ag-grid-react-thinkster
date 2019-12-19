import React, { Component } from "react";

export default class NameFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.value = this.props.value;
    this.rowIndex = this.props.rowIndex;
    this.id = this.props.data.id;
    this.api = props.api;
    this.state = {
      flaggedForReview: false
    };
  }

  flag = () => {
    alert(`${this.value} is flagged for review! (id: ${this.id})`);
    this.setState({ flaggedForReview: true });
  };

  render() {
    return (
      <div>
        <span style={{ color: this.state.flaggedForReview ? "red" : "black" }}>
          {this.value}!
        </span>
        <button
          type="button"
          style={{ marginLeft: "5px" }}
          onClick={this.flag}
          disabled={this.state.flaggedForReview}
        >
          Flag for Review!
        </button>
      </div>
    );
  }
}
