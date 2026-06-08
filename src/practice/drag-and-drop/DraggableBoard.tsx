import React, { useState } from 'react'
import MyDiv from './MyDiv'


export type Item = {
    id: number,
    name: string, 
}

export default function DraggableBoard() {
    const [items, setItems] = useState<Item[]>([{
        id: 1, 
        name:'apple'
    },
    {
        id: 2, 
        name:'ball'
    },
    {
        id: 3, 
        name:'cat'
    },

])
  return (
    <div className='border-amber-400 border-4 flex gap-4'>
       <MyDiv divTitle ='Div-A' items={items} initialItemIdsToRender={[1,2,3]}></MyDiv>
       <MyDiv divTitle='Div-B' items={items} initialItemIdsToRender={[]}></MyDiv>
    </div>
  )
}
