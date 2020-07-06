import React from "react";

const Task = (props) => {
  return (
    <div className="board-task d-flex align-items-baseline">
      <span className="task-icon">
        <i className="icon-sticky-note-o"></i>
      </span>
      <div className="task-content">
        <header>
          <b>{props.header}</b>
        </header>
        <section>
          <p className="task-description">{props.description}</p>
          <div>{props.subtasks}</div>
        </section>
        <footer>{props.footer}</footer>
      </div>
      <span className="task-icon">
        <i className="icon-dot-3"></i>
      </span>
    </div>
  );
};

export default Task;
