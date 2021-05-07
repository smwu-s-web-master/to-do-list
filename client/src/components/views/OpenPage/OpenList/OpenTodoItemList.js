import React, { Component } from "react";
import OpenTodoItem from "./OpenTodoItem";

class OpenTodoItemList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }

  render() {
    const { todos } = this.props;

    const todoList = todos.map(
      ({ id, text, checked, privated }) =>
        privated === false && (
          <OpenTodoItem
            key={id}
            id={id}
            text={text}
            checked={checked}
            privated={privated}
          />
        )
    );

    return <div>{todoList}</div>;
  }
}

export default OpenTodoItemList;
