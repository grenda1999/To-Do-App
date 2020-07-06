import React, { useState } from "react";
import Board from "../components/Board";

const SamplePage = () => {
  const [boardsSettings, setBoardsSettings] = useState([
    { name: "To do" },
    { name: "In progress" },
    { name: "Done" },
  ]);

  const [tasksSettings, setTasksSettings] = useState([
    {
      header: "Header",
      description: "Description",
      subtasks: "Subtasks",
      footer: "Footer",
      id: "To do",
    },
  ]);

  const handleAddColumn = () => {
    setBoardsSettings([...boardsSettings, { name: "Next" }]);
  };

  const handleAddTask = (id) => {
    setTasksSettings([
      ...tasksSettings,
      {
        header: "Header",
        description: "Description",
        subtasks: "Subtasks",
        footer: "Footer",
        id: id,
      },
    ]);
  };

  const boards = boardsSettings.map((setting) => {
    return (
      <Board
        header={setting.name}
        key={setting.name}
        tasksSettings={tasksSettings}
        click={handleAddTask}
      />
    );
  });

  return (
    <div className="col-12">
      <div className="row">
        {boards}
        <div className="col-sm-6 col-lg-3 mb-2">
          <div
            className="board-add-column d-flex align-items-center justify-content-center"
            onClick={handleAddColumn}
          >
            <span className="add-text">
              <i className="icon-plus"></i>Add column
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
