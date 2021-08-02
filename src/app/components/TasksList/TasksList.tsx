import React from 'react';

import './TasksList.css';

import { ToDoTaskData } from '../../model/ToDoTaskData';

import Task from '../Task';

interface TasksListProps {
  tasks: ToDoTaskData[];
  onTitleChange: (id: string, editedTitle: string)=> void;
  onToggleDone: (id: string)=> void;
  onRemoveTask: (id: string)=> void;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks, onTitleChange, onToggleDone, onRemoveTask,
}) => {
  const uncompletedTasks = tasks.filter((task) => !task.isDone);
  const completedTasks = tasks.filter((task) => task.isDone);
  const sortedTasks = uncompletedTasks.concat(completedTasks);

  return (
    <ul className="TasksList">
      { sortedTasks.map((task) => (
        <li key={ task.id }>
          <Task
            task={ task }
            onTitleChange={ onTitleChange }
            onToggleDone={ onToggleDone }
            onRemoveTask={ onRemoveTask }
          />
        </li>
      )) }
    </ul>
  );
};
export default TasksList;
