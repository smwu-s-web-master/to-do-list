import React from 'react';
import './OpenTodoListTemplate.css';

const OpenTodoListTemplate = ({children}) => {
  return (
      <section className="open-todos-wrapper">
        { children }
      </section>
  );
};

export default OpenTodoListTemplate;