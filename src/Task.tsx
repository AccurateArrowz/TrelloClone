import React, { useState, useLayoutEffect, useRef } from "react";
import type { UUID } from "./types";
import type { HandleTaskStatusToggle } from "./types";
import type { HandleTaskRef, DropIndicator } from "./Group";
import { cn } from "./utils/cn";
import { Pencil, Trash } from "lucide-react";
import UpdateTask from "./UpdateTask";

export type TaskType = {
  id: UUID;
  groupId: UUID;
  description: string;
  completed: boolean;
  taskRect?: TaskRect;
  order: number // order of the task in the Group
};


export type TaskRect = {
  top: number; //how far it the task rectangle from the top of viewport / client
  bottom: number;
  clientMidPoint: number;
};
export type TaskProp = {
  task: TaskType;
  onTaskStatusToggle: HandleTaskStatusToggle;
  onAddTaskRef: HandleTaskRef;
  dropIndicator: DropIndicator;
  onTaskUpdate: (payload: { taskId: string; groupId: string; newValue: string }) => void;
  onDeleteTask: (payload: { task: TaskType }) => void;
};

export default function Task({
  task,
  onTaskStatusToggle,
  onAddTaskRef,
  dropIndicator,
  onTaskUpdate,
  onDeleteTask,
}: TaskProp) {
  const { description, completed } = task;
  const taskRef = useRef<HTMLLIElement | null>(null);
  const showDropIndicator = task.id === dropIndicator.taskAnchorId;
  const [showEditDeleteBtn, setShowEditDeleteBtn] = useState(false);
  const [showUpdateTask , setShowUpdateTask ] = useState(false);

  const onDragStart: React.DragEventHandler<HTMLLIElement> = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(task));
  };

  const handlePointerEnter = ()=> {
    setShowEditDeleteBtn(true);
    }
  const handlePointerLeave = ()=> {
    setShowEditDeleteBtn(false);
  }
  const cancelUpdateTask = ()=> {setShowUpdateTask(false)};


  useLayoutEffect(() => {
    onAddTaskRef({
      node: taskRef.current,
      id: task.id,
    });
    return () => {
      onAddTaskRef({ node: null, id: task.id });
    };
  }, []);
if(showUpdateTask){
  return <UpdateTask id={task.id} groupId={task.groupId} text={task.description} onTaskUpdate={onTaskUpdate} onCancelUpdateTask={cancelUpdateTask} ></UpdateTask>
}
  return (
<li
  className={cn(
    "flex gap-1 border-1 relative mt-1.5",
    // top dropIndicator
    "before:content-[''] before:absolute before:-top-0.5 before:left-0 before:w-full before:h-[4px] before:bg-blue-400 before:rounded-full before:pointer-events-none before:opacity-0 before:transition-opacity before:duration-200",
    // bottom dropIndicator
    "after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-[4px] after:bg-blue-400 after:rounded-full after:pointer-events-none after:opacity-0 after:transition-opacity after:duration-200",
    showDropIndicator && dropIndicator.position === "top" && "before:opacity-100",
    showDropIndicator && dropIndicator.position === "bottom" && "after:opacity-100",
  )}
  draggable
  ref={taskRef}
  onDragStart={onDragStart}
  onPointerEnter = {handlePointerEnter}
  onPointerLeave = {handlePointerLeave}
>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onTaskStatusToggle(task)}
        />
      <span>{description}</span>
{
  showEditDeleteBtn && 
  
<div className="bg-white mt-0.5 absolute top-0 right-0 flex shrink-0 items-center gap-1">      {/* update / del buttons-wrapper */}
    <button
      aria-label="Edit card"
      className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
      onClick={() => setShowUpdateTask(true)}
      >
      <Pencil size={14} />
    </button>
    <button
      aria-label="Delete card"
      className="rounded p-1 text-neutral-400 hover:bg-red-50 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors"
      onClick={() => onDeleteTask({ task })}
      >
      <Trash size={14} />
    </button>
  </div>
}
    </li>
  );
}