import { useState } from "react";
import AddNewTask from "./AddNewTask";
import Task from "./Task";
import type { UUID } from "./types";
import type { TaskType } from "./Task";

export type GroupType = {
  id: UUID;
  title: string;
  tasks: TaskType[]
};

type GroupProps = {
  group: GroupType;
  tasksToRender: TaskType[],
  onAddNewTask: ({groupId, newTask}: {groupId:UUID , newTask: TaskType} )=> void,
};



export default function Group({ group, onAddNewTask}: GroupProps) {
  const [isAddNewTaskInputOpen, setIsAddNewTaskInputOpen] = useState(false);


  // const addNewTask = (description: string) => {
  //   const newTask: TaskType = {
  //     id: crypto.randomUUID() as UUID,
  //     description,
  //     completed: false,
  //   };
  //   setTasks([...tasks, newTask]);
  //   setIsAddNewTaskInputOpen(false);
  // };
  
  const toggleTaskStatus = (id: UUID) => {
    console.log("try to toggleTaskStatus");
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    console.log(newTasks);
    setTasks(newTasks);
  };

  const handleDragOver:  React.DragEventHandler<HTMLDivElement> = (e)=> {
      e.preventDefault();
    }

  const submitNewTask = (description: string)=> { //prepares the task paylaod and calls addNewTask handler from Board comp
    const newTask: TaskType = {
      id: crypto.randomUUID() as UUID,
      description,
      completed: false,
    };
    setIsAddNewTaskInputOpen(false);
    onAddNewTask({groupId: group.id, newTask}); 
  }
  console.log('group id: ', group.id);
  console.log('tasks : ', group.tasks);

  return (
    <div className="w-72 max-h-1/3 border-2 shrink-0 bg-white rounded-lg p-3"
    onDragOver={handleDragOver}>
      <h3>{group.title}</h3>
      <ul>
        {group.tasks.map((task) => (
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
        onAddNewTask={submitNewTask}
      ></AddNewTask>
    </div>
  );
}
