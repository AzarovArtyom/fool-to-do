import React from 'react';

import './TaskSteps.css';

import AddTaskStep from '../AddTaskStep';

import { TaskStepData } from '../../model/TaskStepData';

interface TaskStepsProps {
  onAddTaskStep(title: string): void
  steps: TaskStepData[]
}

const TaskStepsList: React.FC<TaskStepsProps> = ({ onAddTaskStep, steps }) => (
  <div>
    <AddTaskStep onAddTaskStep={ onAddTaskStep } />
    <ul>
      { steps.map((step) => (
        <li key={ step.id }>{ step.title }</li>
      )) }
    </ul>
  </div>
);
export default TaskStepsList;
