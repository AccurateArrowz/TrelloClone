import React from 'react'

type ListItemProps = {
  id: number,
    name: string, 
    onDragEnd: (id: number) => void
}

export default function ListItem({id, name, onDragEnd}: ListItemProps) {
  const handleDragStart: React.DragEventHandler<HTMLLIElement> = (e)=> {
    e.dataTransfer.setData('text/plain', String(id))
  }

  return (
    <li className='border-1 '
     draggable onDragStart={handleDragStart} onDragEnd={() => onDragEnd(id)}> {name}</li>
  )
}
