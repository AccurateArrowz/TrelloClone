import { useState} from 'react'
import type {GroupType} from './Group'
import Group from './Group';
import AddNewGroup from './AddNewGroup';
import type { UUID, OnAddNewTask } from './types';


const sampleData: GroupType[] = [
  {
    id: 'group-a' as UUID, 
    title: 'Group First',
    tasks: [
      { id: 'task-1' as UUID,
      description: 'this is the task 1 ',
    completed: false,},
      { id: 'task-2' as UUID,
      description: 'this is the task 2 ',
    completed: false,}
    ]
  }, 
  {
     id: 'group-b' as UUID, 
     title: 'Group Second',
     tasks: [
      { id: 'task-3' as UUID,
      description: 'this is the task 1 ',
    completed: false,},
      { id: 'task-4' as UUID,
      description: 'this is the task 2 ',
    completed: false,}
    ]
    }
];

export default function Board() {
  //somple data for userId A and boardId x
  const [groups, setGroups] = useState<GroupType[]>(sampleData);
  const [isAddNewGroupInputOpen, setIsAddNewGroupInputOpen] = useState(false)


  const handleAddNewGroup = (group:GroupType)=> {
    setGroups([...groups, group]);
    setIsAddNewGroupInputOpen(false);
  }

  const handleAddNewTask: OnAddNewTask = ({newTask, groupId}) => {
    const updateGroups = groups.map(group=> group.id === groupId ? 
        {...group,
          tasks: [...group.tasks,
            newTask
          ]
        }
        : 
        group
     );
     console.log('updateGroups: ', updateGroups)
    setGroups(updateGroups);
  }

  // const handleTaskDrop: OnTaskDrop = ({groupId, taskId})=> {
    
  // }

  return (
    <div className="flex gap-4 overflow-x-auto p-4 h-screen">
  
      {groups.map(group=> (
        <Group key={group.id} 
        group={group} 
        tasksToRender={group.tasks}
        onAddNewTask={handleAddNewTask}
        ></Group>
      ))}
    <AddNewGroup isAddNewGroupInputOpen={isAddNewGroupInputOpen}
      openAddNewGroupInput={()=> setIsAddNewGroupInputOpen(true)}
      onCloseNewGroupInput={()=> setIsAddNewGroupInputOpen(false)}
    onAddNewGroup={handleAddNewGroup} 
       
    ></AddNewGroup>

  </div>
  )
}
