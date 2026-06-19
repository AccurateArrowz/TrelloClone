import { useState } from "react";
import AddNewTask from "./AddNewTask";
import Task from "./Task";
import type { UUID } from "./types";
import type { TaskType } from "./Task";
import type { HandleTaskDrop, HandleTaskStatusToggle } from "./Board";

export type GroupType = {
  id: UUID;
  title: string;
  tasks: TaskType[]
};

type GroupProps = {
  group: GroupType;
  onAddNewTask: ({groupId, newTask}: {groupId:UUID , newTask: TaskType} )=> void;
  handleTaskDrop: HandleTaskDrop ;
  submitTaskStatusToggle: HandleTaskStatusToggle;
};



export default function Group({ group, onAddNewTask, handleTaskDrop, submitTaskStatusToggle}: GroupProps) {
  const [isAddNewTaskInputOpen, setIsAddNewTaskInputOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false); //note drageOver means a element is being hovered over the div (referencing from browser api)
  
  const onTaskStatusToggle: HandleTaskStatusToggle = (task) => {
    submitTaskStatusToggle(task)
  };

  const handleDragOver:  React.DragEventHandler<HTMLDivElement> = (e)=> {
      e.preventDefault();
      setIsDragOver(true);
  };

  const submitNewTask = (description: string)=> { //prepares the task paylaod and calls addNewTask handler from Board comp
    const newTask: TaskType = {
      id: crypto.randomUUID() as UUID,
      groupId: group.id,
      description,
      completed: false,
    };
    setIsAddNewTaskInputOpen(false);
    onAddNewTask({groupId: group.id, newTask}); 
  };

  const submitTaskDrop: React.DragEventHandler<HTMLDivElement>= (e)=> {
    e.preventDefault();
    console.log('task dropeed in group: ', group.title)
    const task:TaskType = JSON.parse(e.dataTransfer.getData('text/plain'));
      //attach the newGroupId on drop
      handleTaskDrop({
        task,
        newGroupId: group.id
      })

  };

  const onDragLeave = ()=> {
          setIsDragOver(false);

  }

  return (
<div className={`w-72 min-h-1/3 border-2 shrink-0 bg-white rounded-lg p-3 ${isDragOver ? "ring-2 ring-amber-300" : ""}`}
    onDragOver={handleDragOver}
    onDrop={submitTaskDrop}
    onDragLeave={onDragLeave}
    >
      <h3>{group.title}</h3>
      <ul>
        {group.tasks.map((task) => (
          <Task
            key={task.id}
          task={task}
            onTaskStatusToggle={onTaskStatusToggle}
          ></Task>
        ))}
      </ul>
      <AddNewTask
        isAddNewTaskInputOpen={isAddNewTaskInputOpen}
        openAddNewTaskInput={() => setIsAddNewTaskInputOpen(true)}
        closeAddNewTaskInput={() => setIsAddNewTaskInputOpen(false)}
        onAddNewTask={submitNewTask}
      ></AddNewTask>
    </div>
  );
}
