import { useState, useRef, useEffect, useCallback } from "react";
import AddNewTask from "./AddNewTask";
import Task from "./Task";
import type { UUID } from "./types";
import type { TaskType } from "./Task";
import type { HandleTaskDrop, HandleTaskStatusToggle } from "./types";
import React from "react";


export type GroupType = {
  id: UUID;
  title: string;
  tasks: TaskType[];
};


export type DropIndicator = {
  taskAnchorId: UUID | null; 
  position: "top" | "bottom";
  groupId: UUID; //storing to allow fast lookup
};
type GroupProps = {
  group: GroupType;
  HandleAddNewTask: ({
    groupId,
    newTask,
  }: {
    groupId: UUID;
    newTask: TaskType;
  }) => void;
  handleTaskDrop: HandleTaskDrop;
  submitTaskStatusToggle: HandleTaskStatusToggle;
};

const DRAG_OVER_THROTTLE_MS = 50;

export type HandleTaskRef = ({
  node,
  id,
}: {
  node: HTMLElement | null;
  id: UUID;
}) => void;

const Group = React.memo(function Group({
  group,
  HandleAddNewTask,
  handleTaskDrop,
  submitTaskStatusToggle,
}: GroupProps) {
  const [isAddNewTaskInputOpen, setIsAddNewTaskInputOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false); //note drageOver means a element is being hovered over the div (referencing from browser api)
  const tasksRef = useRef(new Map<UUID, HTMLElement>()); //stores ref of each task
  const [dropIndicator, setDropIndicator] = useState<DropIndicator>({
    taskAnchorId: null,
    position: "top",
    groupId: group.id
  });
  // const [dropItemIndex, setDropItemIndex] = useState<number>(); //state to store index for a drop item 
  const lastDragOverAtRef = useRef(0);
  const pendingDragOverTimeoutRef = useRef<number | null>(null);
  const latestDragYRef = useRef<number | null>(null);

  const updateDropIndicator = useCallback(() => {
    const y = latestDragYRef.current;
    console.log()
    if (y === null) {
      return;
    }

    for (const taskRef of [...tasksRef.current]) {
      const [id, domNode] = taskRef;
      const { top, bottom } = domNode.getBoundingClientRect();
      if (y >= top && y <= bottom) {
        //if the pionter is within  the taskRef
        const midpoint = (top + bottom) / 2;
        if (y < midpoint) {
          setDropIndicator({ taskAnchorId: id, position: "top", groupId: group.id});
        } else {
          setDropIndicator({ taskAnchorId: id, position: "bottom", groupId: group.id});
        }
        break;
      }
    }
  }, [group.id]);

  const throttledUpdateDropIndicator = useCallback(() => {
    const now = window.performance.now();
    const timeSinceLastDragOver = now - lastDragOverAtRef.current;

    if (timeSinceLastDragOver >= DRAG_OVER_THROTTLE_MS) {
      lastDragOverAtRef.current = now;
      updateDropIndicator();
      return;
    }

    if (pendingDragOverTimeoutRef.current !== null) {
      return;
    }

    pendingDragOverTimeoutRef.current = window.setTimeout(() => {
      pendingDragOverTimeoutRef.current = null;
      lastDragOverAtRef.current = window.performance.now();
      updateDropIndicator();
    }, DRAG_OVER_THROTTLE_MS - timeSinceLastDragOver);
  }, [updateDropIndicator]);

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    latestDragYRef.current = e.clientY;
    setIsDragOver(true);
    throttledUpdateDropIndicator();
  };

  // Task related state udpate  / handlers 
    const onTaskStatusToggle: HandleTaskStatusToggle = (task) => {
    submitTaskStatusToggle(task);
  };

  useEffect(() => {
    return () => {
      if (pendingDragOverTimeoutRef.current !== null) {
        window.clearTimeout(pendingDragOverTimeoutRef.current);
      }
    };
  }, []);

  const submitNewTask = (description: string) => {
    //prepares the task paylaod and calls addNewTask handler from Board comp
    const newTask: TaskType = {
      id: crypto.randomUUID() as UUID,
      groupId: group.id,
      description,
      completed: false,
      order: group.tasks.length
    };
    setIsAddNewTaskInputOpen(false);
    HandleAddNewTask({ groupId: group.id, newTask });
  };

  const submitTaskDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const task: TaskType = JSON.parse(e.dataTransfer.getData("text/plain"));
    //attach the newGroupId on drop
    handleTaskDrop({
      task,
      newGroupId: group.id,
      dropIndicator
    });
    setIsDragOver(false);
    latestDragYRef.current = null;
    setDropIndicator({
      taskAnchorId: null,
      position: "top",
      groupId: group.id
    });
  };

  const onDragLeave = () => {
    setIsDragOver(false);
    latestDragYRef.current = null;
    setDropIndicator({
      taskAnchorId: null,
      position: "top",
      groupId: group.id
    });
  };

  const handleTaskRef: HandleTaskRef = ({ node, id }) => {
    if (node) {
      tasksRef.current.set(id, node);
    } else {
      //runs on task unmount
      tasksRef.current.delete(id);
    }
  };

  return (
    <div
      className={`w-72 h-max flex flex-col gap-y-2 border-1 shrink-0 bg-white rounded-lg p-3 ${isDragOver ? "ring-2 ring-amber-300" : ""}`}
      onDragOver={handleDragOver}
      onDrop={submitTaskDrop}
      onDragLeave={onDragLeave}
    >
      <h3>{group.title}</h3>
      <ul>
        {group?.tasks?.map((task) => (
          <Task
            key={task.id}
            onAddTaskRef={handleTaskRef}
            task={task}
            onTaskStatusToggle={onTaskStatusToggle}
            dropIndicator={dropIndicator}
          ></Task>
        ))}
      </ul>
      <AddNewTask
        isAddNewTaskInputOpen={isAddNewTaskInputOpen}
        openAddNewTaskInput={() => setIsAddNewTaskInputOpen(true)}
        closeAddNewTaskInput={() => setIsAddNewTaskInputOpen(false)}
        HandleAddNewTask={submitNewTask}
      ></AddNewTask>
    </div>
  );
});
export default Group;

