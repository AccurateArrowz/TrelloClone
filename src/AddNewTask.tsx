import React, { useState } from "react";


type AddNewTaskProp = {
  isAddNewTaskInputOpen: boolean;
  openAddNewTaskInput: () => void;
  closeAddNewTaskInput: () => void;
  onAddNewTask:  (description: string)=> void,
};

export default function AddNewTask({
  isAddNewTaskInputOpen,
  openAddNewTaskInput,
  closeAddNewTaskInput,
  onAddNewTask,
}: AddNewTaskProp) {
  const [newTaskDescription, setNewTaskDescription] = useState('');
  
  const handleAddNewTask =()=> {
    if(!newTaskDescription.trim()) return ;
    onAddNewTask(newTaskDescription);
  }


  if (!isAddNewTaskInputOpen) {
    return <button onClick={openAddNewTaskInput}>Add New Task</button>;
  }
  return <div>
    <input type="text" value={newTaskDescription} onChange={(e)=>setNewTaskDescription(e.target.value)}/>
    <div className='flex gap-2'>

    <button onClick={handleAddNewTask}>Add </button>
    <button onClick={closeAddNewTaskInput}>Cancel</button>
    </div>
  </div>;
}
