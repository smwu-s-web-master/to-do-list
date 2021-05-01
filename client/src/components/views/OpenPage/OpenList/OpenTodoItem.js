import React, { Component } from "react";
import "./OpenTodoItem.css";

class OpenTodoItem extends Component {
  
  render() {
    const {
      text,
      checked,
      id,
      privated
    } = this.props;

    return (
      <div className="open-todo-item">
        {checked && <div className="open-check-mark">✓</div>}
        <div className={`open-todo-text ${checked && "checked"}`}>
          <div>{text}</div>
        </div>
        <div className="open-private">
          {privated === true ? "🔒" : "🔓"}
        </div>
      </div>
    );
  }
}

export default OpenTodoItem;