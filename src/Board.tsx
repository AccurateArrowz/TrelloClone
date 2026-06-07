import { useState} from 'react'
import type {GroupType} from './Group'
import Group from './Group';
import AddNewGroup from './AddNewGroup';



export default function Board() {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [isAddNewGroupInputOpen, setIsAddNewGroupInputOpen] = useState(false)


  const addNewGroup = (group:GroupType)=> {
    setGroups([...groups, group]);
    setIsAddNewGroupInputOpen(false);
  }


  return (
    <div className="flex gap-4 overflow-x-auto p-4 h-screen">
  
      {groups.map(group=> (
        <Group key={group.id} group={group}></Group>
      ))}
    <AddNewGroup isAddNewGroupInputOpen={isAddNewGroupInputOpen}
      openAddNewGroupInput={()=> setIsAddNewGroupInputOpen(true)}
      onCloseNewGroupInput={()=> setIsAddNewGroupInputOpen(false)}
    onAddNewGroup={addNewGroup} 
       
    ></AddNewGroup>

  </div>
  )
}
