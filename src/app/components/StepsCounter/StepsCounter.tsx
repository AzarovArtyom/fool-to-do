import React from 'react';

import './StepsCounter.css';

import { TaskStepData } from '../../model/TaskStepData';

interface StepsCounterProps {
  steps: TaskStepData[]
}

const StepsCounter:React.FC<StepsCounterProps> = ({ steps }) => {
  const completedSteps = steps.filter((step) => step.isDone);
  return (
    <div>
      { completedSteps.length }
      { ' ' }
      of
      { ' ' }
      { steps.length }
    </div>
  );
};

export default StepsCounter;
