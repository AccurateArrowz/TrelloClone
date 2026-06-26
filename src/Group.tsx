import { useState, useRef, useEffect, useCallback } from "react";
import AddNewTask from "./AddNewTask";
import Task from "./Task";
import type { UUID } from "./types";
import type { RawTaskType, TaskType } from "./Task";
import type { HandleTaskDrop, HandleTaskStatusToggle } from "./Board";
import React from "react";

export type Group = {
  id: UUID;
  title: string;
  tasks: RawTaskType[];
};
export type NormalizedGroup = Omit<Group, 'tasks'> & {taskIds: UUID[] };

export type Indicator = {
  taskAnchorId: UUID | null; //which task to anchor the indicator line to
  position: "top" | "bottom";
};
type GroupProps = {
  group: NormalizedGroup;
  tasks: TaskType[] | undefined;
  onAddNewTask: ({
    groupId,
    newTask,
  }: {
    groupId: UUID;
    newTask: RawTaskType;
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
  tasks,
  onAddNewTask,
  handleTaskDrop,
  submitTaskStatusToggle,
}: GroupProps) {
  const [isAddNewTaskInputOpen, setIsAddNewTaskInputOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false); //note drageOver means a element is being hovered over the div (referencing from browser api)
  const tasksRef = useRef(new Map<UUID, HTMLElement>()); //stores ref of each task
  const [indicator, setIndicator] = useState<Indicator>({
    taskAnchorId: null,
    position: "top",
  });
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
          setIndicator({ taskAnchorId: id, position: "top" });
        } else {
          setIndicator({ taskAnchorId: id, position: "bottom" });
        }
        break;
      }
    }
  }, []);

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
    const newTask: RawTaskType = {
      id: crypto.randomUUID() as UUID,
      groupId: group.id,
      description,
      completed: false,
    };
    setIsAddNewTaskInputOpen(false);
    onAddNewTask({ groupId: group.id, newTask });
  };

  const submitTaskDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const task: RawTaskType = JSON.parse(e.dataTransfer.getData("text/plain"));
    //attach the newGroupId on drop
    handleTaskDrop({
      task,
      newGroupId: group.id,
    });
    setIsDragOver(false);
    latestDragYRef.current = null;
  };

  const onDragLeave = () => {
    setIsDragOver(false);
    latestDragYRef.current = null;
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
      className={`w-72 h-max flex flex-col gap-y-2 border-2 shrink-0 bg-white rounded-lg p-3 ${isDragOver ? "ring-2 ring-amber-300" : ""}`}
      onDragOver={handleDragOver}
      onDrop={submitTaskDrop}
      onDragLeave={onDragLeave}
    >
      <h3>{group.title}</h3>
      <ul>
        {tasks?.map((task) => (
          <Task
            key={task.id}
            onAddTaskRef={handleTaskRef}
            task={task}
            onTaskStatusToggle={onTaskStatusToggle}
            indicator={indicator}
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
});
export default Group;
