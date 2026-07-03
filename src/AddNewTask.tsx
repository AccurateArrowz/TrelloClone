import React, { useLayoutEffect, useRef, useState } from "react";

type AddNewTaskProp = {
  isAddNewTaskInputOpen: boolean;
  openAddNewTaskInput: () => void;
  closeAddNewTaskInput: () => void;
  HandleAddNewTask: (description: string) => void;
};

export default function AddNewTask({
  isAddNewTaskInputOpen,
  openAddNewTaskInput,
  closeAddNewTaskInput,
  HandleAddNewTask,
}: AddNewTaskProp) {
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (isAddNewTaskInputOpen) {
      inputRef.current?.focus();
    }
  }, [isAddNewTaskInputOpen]);

  const handleAddNewTask = () => {
    if (!newTaskDescription.trim()) return;
    HandleAddNewTask(newTaskDescription.trim());
    setNewTaskDescription("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddNewTask();
    } else if (e.key === "Escape") {
      closeAddNewTaskInput();
    }
  };

  // Use blur to cancel; prevent close when Enter fires (blur fires after keydown)
  const handleBlur = () => {
    closeAddNewTaskInput();
    setNewTaskDescription("");
  };

  if (!isAddNewTaskInputOpen) {
    return <button onClick={openAddNewTaskInput}>Add New Task</button>;
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={newTaskDescription}
      onChange={(e) => setNewTaskDescription(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      placeholder="Enter task title…"
      aria-label="New task title"
      autoComplete="off"
      style={{ width: "100%", boxSizing: "border-box" }}
    />
  );
}
