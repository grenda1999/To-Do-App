import React from "react";
import Task from "./Task";

const Board = (props) => {
  const tasksGroup = props.tasksSettings.filter((task) => {
    return task.id === props.header;
  });

  const tasks =
    tasksGroup.length !== 0
      ? tasksGroup.map((task, index) => {
          return (
            <Task
              header={task.header}
              description={task.description}
              subtasks={task.subtasks}
              footer={task.footer}
              key={index}
            />
          );
        })
      : null;

  return (
    <div className="col-sm-6 col-lg-3 mb-2">
      <div className="board-container d-flex flex-column">
        <header className="board-header d-flex px-3">
          <span className="header-text mr-auto">{props.header}</span>
          <span className="header-options">
            <span
              onClick={() => {
                props.click(props.header);
              }}
            >
              <i className="icon-plus"></i>
            </span>
            <span>
              <i className="icon-dot-3"></i>
            </span>
          </span>
        </header>
        <section className="board-body-container">
          <div className="board-body px-3">{tasks}</div>
        </section>
      </div>
    </div>
  );
};

export default Board;
