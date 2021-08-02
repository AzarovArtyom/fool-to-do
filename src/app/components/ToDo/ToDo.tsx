import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import './ToDoList.css';

import AddTask from '../AddTask';

import { ToDoTaskData } from '../../model/ToDoTaskData';

const ToDoList: React.FC = () => {
  const [tasks, setTask] = useState<ToDoTaskData[]>([]);

  const handleAddTask = (title: string): void => {
    const newTask: ToDoTaskData = {
      id: nanoid(),
      title,
      isDone: false,
    };
    setTask((prevState) => [newTask, ...prevState]);
  };

  return (
    <div className="ToDoList">
      <AddTask onAddTask={ handleAddTask } />
      <p>Task</p>
    </div>
  );
};

export default ToDoList;
