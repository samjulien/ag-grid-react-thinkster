import React, { Component } from "react";
import {
  deleteOrBackspace,
  isKeyPressedNumeric,
  isLeftOrRight,
  KEY_BACKSPACE,
  KEY_DELETE,
} from "./helpers";

class NumericCellEditor extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    let initialState =
      props.keyPress === KEY_BACKSPACE || props.keyPress === KEY_DELETE
        ? ""
        : props.value;
    this.state = { value: initialState };
  }

  afterGuiAttached() {
    this.editorRef.current.focus();
  }

  getValue() {
    return this.state.value;
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  onKeyDown = (event) => {
    if (isLeftOrRight(event) || deleteOrBackspace(event)) {
      event.stopPropagation();
      return;
    }

    if (!isKeyPressedNumeric(event) && event.preventDefault) {
      event.preventDefault();
    }
  };

  render() {
    return (
      <input
        value={this.state.value}
        ref={this.editorRef}
        onChange={this.handleChange}
        onKeyDown={this.onKeyDown}
        style={{ width: "100%" }}
      />
    );
  }
}

export default NumericCellEditor;
