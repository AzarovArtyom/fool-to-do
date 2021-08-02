import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import './Task.css';

import { ToDoTaskData } from '../../model/ToDoTaskData';
import { TaskStepData } from '../../model/TaskStepData';

import TaskStepsList from '../TaskStepsList';
import StepsCounter from '../StepsCounter';

import { isTitleValid } from '../../utils/common';

interface TaskProps {
  task: ToDoTaskData;
  onTitleChange: (id: string, editedTitle: string)=> void;
  onToggleDone: (id: string)=> void;
  onRemoveTask: (id: string)=> void;
}

const Task:React.FC<TaskProps> = ({
  task, onTitleChange, onToggleDone, onRemoveTask,
}) => {
  const { id, title, isDone } = task;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(title);
  const [steps, setStep] = useState<TaskStepData[]>([]);
  const [isAddStepMode, setIsAddStepMode] = useState<boolean>(false);

  const handleAddTaskStep = (title: string):void => {
    const newTaskStep: TaskStepData = {
      id: nanoid(),
      title,
      isDone: false,
    };
    setStep((prevState) => [newTaskStep, ...prevState]);
  };

  const handleStepTitleChange = (id: string, editedStepTitle: string): void => {
    const updatedTaskSteps = [...steps.map((step: TaskStepData) => (step.id === id ? { ...step, title: editedStepTitle } : step))];
    setStep(updatedTaskSteps);
  };

  const handleToggleStepDone = (id: string): void => {
    const updatedTaskSteps = [...steps.map((step: TaskStepData) => (step.id === id ? { ...step, isDone: !step.isDone } : step))];
    setStep(updatedTaskSteps);
  };

  const handleRemoveStep = (id: string): void => {
    const updatedTaskSteps = [...steps.filter((step:TaskStepData) => step.id !== id)];
    setStep(updatedTaskSteps);
  };

  return (
    <div className="Task">
      <div className="Task-main">
        <div className="Task-view">
          <div className="Task-checkbox">
            <input type="checkbox" checked={ isDone } onChange={ handleToggleDone } />
          </div>

          <div className={ getClasses(isDone) }>
            { !isEditMode
            && <span onClick={ handleAddStepClick }>{ title }</span> }

            { isEditMode
          && (
          <input
            className="Task-input"
            type="text"
            autoFocus
            onFocus={ handleFocus }
            value={ editTitle }
            onChange={ handleInputChange }
            onBlur={ handleInputBlur }
            onKeyPress={ handleInputKeyPress }
          />
          ) }
          </div>
        </div>
        <div className="Task-actions">
          { !isEditMode && <button onClick={ handleEditClick }>Edit</button> }
          <button className="Task-remove-btn" onClick={ handleRemoveClick }>Remove</button>
        </div>
        <div className="Task-stepsCounter">
          { steps.length > 0
          && (
          <StepsCounter steps={ steps } />
          ) }
        </div>
      </div>
      <div className="Task-steps">
        { isAddStepMode
        && (
        <TaskStepsList
          onAddTaskStep={ handleAddTaskStep }
          steps={ steps }
          onStepTitleChange={ handleStepTitleChange }
          onToggleStepDone={ handleToggleStepDone }
          onRemoveStep={ handleRemoveStep }
        />
        ) }
      </div>
    </div>
  );

  function getClasses(isDone: boolean):string {
    const classes = ['Task-title'];

    if (isDone) {
      classes.push('done');
    }

    return classes.join('-');
  }

  function handleToggleDone():void {
    onToggleDone(id);
  }

  function handleRemoveClick():void {
    onRemoveTask(id);
  }

  function handleEditClick():void {
    setIsEditMode(true);
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>): void {
    event.target.select();
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>):void {
    setEditTitle(event.target.value);
  }

  function handleInputBlur():void {
    handleTitleChange();
  }

  function handleInputKeyPress(event: React.KeyboardEvent<HTMLInputElement>):void {
    if (event.key === 'Enter') handleTitleChange();
  }

  function handleTitleChange():void {
    setIsEditMode(false);
    if (isTitleValid(editTitle)) {
      setEditTitle(editTitle);
      onTitleChange(id, editTitle);
    }
  }

  function handleAddStepClick():void {
    setIsAddStepMode(!isAddStepMode);
  }
};

export default Task;
