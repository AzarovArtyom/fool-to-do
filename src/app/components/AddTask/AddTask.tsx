import React, { useState } from 'react';

import './AddTask.css';

import { isTitleValid } from '../../utils/common';

interface AddTaskProps {
  onAddTask(title: string): void
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <form className="AddTask-form" onSubmit={ handleInputSubmit }>
      <button className="AddTask-button" type="submit">add</button>
      <input
        className="AddTask-input"
        autoFocus
        type="text"
        placeholder="Add Task"
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
      onAddTask(inputValue);
      setInputValue('');
    }
  }
};

export default AddTask;
