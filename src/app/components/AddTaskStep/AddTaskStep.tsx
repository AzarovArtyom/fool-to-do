import React, { useState } from 'react';

import './AddTaskStep.css';

import { isTitleValid } from '../../utils/common';

interface AddTaskStepProps {
  onAddTaskStep(title: string): void
}

const AddTaskStep: React.FC<AddTaskStepProps> = ({ onAddTaskStep }) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <form className="AddTaskStep-form" onSubmit={ handleInputSubmit }>
      <button className="AddTaskStep-button" type="submit">add</button>
      <input
        className="AddTaskStep-input"
        autoFocus
        type="text"
        placeholder="Add Step"
        value={ inputValue }
        onChange={ handleInputChange }
      />
    </form>
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
  }

  function handleInputSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (isTitleValid(inputValue)) {
      onAddTaskStep(inputValue);
      setInputValue('');
    }
  }
};

export default AddTaskStep;
