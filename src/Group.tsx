import { useState } from "react";
import AddNewTask from "./AddNewTask";
import Task from "./Task";
import type { UUID } from "./types";
import type { TaskType } from "./Task";

export type GroupType = {
  id: UUID;
  title: string;
};

type GroupProps = {
  group: GroupType;
};

export default function Group({ group }: GroupProps) {
  const [isAddNewTaskInputOpen, setIsAddNewTaskInputOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const addNewTask = (description: string) => {
    const newTask: TaskType = {
      id: crypto.randomUUID() as UUID,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setIsAddNewTaskInputOpen(false);
  };
  const toggleTaskStatus = (id: UUID) => {
    console.log("try to toggleTaskStatus");
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    console.log(newTasks);
    setTasks(newTasks);
  };

  return (
    <div className="w-72 max-h-1/3 border-2 shrink-0 bg-white rounded-lg p-3">
      <h3>{group.title}</h3>
      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            description={task.description}
            completed={task.completed}
            toggleTaskStatus={toggleTaskStatus}
          ></Task>
        ))}
      </ul>
      <AddNewTask
        isAddNewTaskInputOpen={isAddNewTaskInputOpen}
        openAddNewTaskInput={() => setIsAddNewTaskInputOpen(true)}
        closeAddNewTaskInput={() => setIsAddNewTaskInputOpen(false)}
        onAddNewTask={addNewTask}
      ></AddNewTask>
    </div>
  );
}
