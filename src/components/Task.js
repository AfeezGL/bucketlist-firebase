import React from "react";

const Task = ({ task, clickFunction }) => {
    return (
        <div className="task">
            <p>{task.data.task}</p>
            <button onClick={() => clickFunction(task)}></button>
        </div>
    );
};

export default Task;
