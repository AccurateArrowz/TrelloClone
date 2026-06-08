import React, { useState } from 'react'
import type { Item } from './DraggableBoard'
import ListItem from './ListItem'

type MyDivProps = {
  divTitle: string
  items: Item[],
  initialItemIdsToRender: number[]
}

export default function MyDiv({divTitle,items, initialItemIdsToRender}: MyDivProps) {
  const [itemIdsToRender, setItemIdsToRender] = useState<number[]>(initialItemIdsToRender)
  
  const handleDragOver:  React.DragEventHandler<HTMLDivElement> = (e)=> {
    e.preventDefault();
  }
const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
  e.preventDefault();
  const rawItemId = e.dataTransfer.getData('text/plain');
  if (!rawItemId) return;

  const newItemId = Number(rawItemId);
  setItemIdsToRender([...itemIdsToRender, newItemId]);
}
const handleDragEndOnItem = (removedItemId: number) => {
  console.log('removedItemId: ', removedItemId);
  setItemIdsToRender([...itemIdsToRender].filter(itemId=> itemId != removedItemId))
}
  return (
    <div className='bg-amber-100 w-1/3 min-h-[300px] flex flex-col gap-1'
      onDragOver={handleDragOver} onDrop={handleDrop}
    >


      <h1>{divTitle}</h1>
       <ul>
            {itemIdsToRender && itemIdsToRender.map(itemId=> {
              const item = items.find(item=> item.id === itemId)

                return item ? 
                  <ListItem key={item.id} id={item.id} name={item.name} onDragEnd={handleDragEndOnItem}/>
                   : null
})}
        </ul>


    </div>
  )
}
