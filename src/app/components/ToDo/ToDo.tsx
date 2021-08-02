import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import './ToDo.css';

import { ToDoTaskData } from '../../model/ToDoTaskData';

import AddTask from '../AddTask';
import TasksList from '../TasksList';

const ToDo: React.FC = () => {
  const [tasks, setTask] = useState<ToDoTaskData[]>([]);

  const handleAddTask = (title: string): void => {
    const newTask: ToDoTaskData = {
      id: nanoid(),
      title,
      isDone: false,
    };
    setTask((prevState) => [newTask, ...prevState]);
  };

  const handleTitleChange = (id: string, editedTitle: string): void => {
    const updatedTasks = [...tasks.map((task: ToDoTaskData) => (task.id === id ? { ...task, title: editedTitle } : task))];
    setTask(updatedTasks);
  };

  const handleToggleDone = (id: string): void => {
    const updatedTasks = [...tasks.map((task: ToDoTaskData) => (task.id === id ? { ...task, isDone: !task.isDone } : task))];
    setTask(updatedTasks);
  };

  const handleRemoveTask = (id: string): void => {
    const updatedTasks = [...tasks.filter((task:ToDoTaskData) => task.id !== id)];
    setTask(updatedTasks);
  };

  return (
    <div className="ToDo">
      <AddTask onAddTask={ handleAddTask } />
      <TasksList
        tasks={ tasks }
        onTitleChange={ handleTitleChange }
        onToggleDone={ handleToggleDone }
        onRemoveTask={ handleRemoveTask }
      />
    </div>
  );
};

export default ToDo;
