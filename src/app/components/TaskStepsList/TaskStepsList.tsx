import React from 'react';

import './TaskStepsList.css';

import { TaskStepData } from '../../model/TaskStepData';

import AddTaskStep from '../AddTaskStep';
import TaskStep from '../TaskStep';

interface TaskStepsProps {
  onAddTaskStep(title: string): void
  steps: TaskStepData[],
  onStepTitleChange: (id: string, editedStepTitle: string)=> void;
  onToggleStepDone: (id: string)=> void;
  onRemoveTaskStep: (id: string)=> void;
}

const TaskStepsList: React.FC<TaskStepsProps> = ({
  onAddTaskStep, steps, onStepTitleChange, onToggleStepDone, onRemoveTaskStep,
}) => (

  <div>
    <AddTaskStep onAddTaskStep={ onAddTaskStep } />
    <ul>
      { steps.map((step) => (
        <li key={ step.id }>
          <TaskStep
            step={ step }
            onStepTitleChange={ onStepTitleChange }
            onToggleStepDone={ onToggleStepDone }
            onRemoveTaskStep={ onRemoveTaskStep }
          />
        </li>
      )) }
    </ul>
  </div>
);
export default TaskStepsList;
