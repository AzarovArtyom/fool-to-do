import React, { useState } from 'react';

import './TaskStep.css';

import { isTitleValid } from '../../utils/common';

import { TaskStepData } from '../../model/TaskStepData';

interface TaskStepProps {
  step: TaskStepData;
  onStepTitleChange: (id: string, editedStepTitle: string)=> void;
  onToggleStepDone: (id: string)=> void;
  onRemoveStep: (id: string)=> void;
}

const TaskStep:React.FC<TaskStepProps> = ({
  step, onStepTitleChange, onToggleStepDone, onRemoveStep,
}) => {
  const { id, title, isDone } = step;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(title);

  return (
    <div className="Task">
      <div className="Task-main">
        <div className="Task-view">
          <div className="Task-checkbox">
            <input type="checkbox" checked={ isDone } onChange={ handleToggleDone } />
          </div>

          <div className={ getClasses(isDone) }>
            { !isEditMode
                        && <span>{ title }</span> }
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
    onToggleStepDone(id);
  }

  function handleRemoveClick():void {
    onRemoveStep(id);
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
      onStepTitleChange(id, editTitle);
    }
  }
};

export default TaskStep;
