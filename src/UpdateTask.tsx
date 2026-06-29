import type { UUID } from 'crypto'
import React, { useState } from 'react'

type UpdateTaskProps = {
    id: UUID, 
    value: string, 
    onTaskUpdate : 
};

export default function UpdateTask({id, value}: UpdateTaskProps) {
    const [input , setInput] = useState(value);
  return (
    <div>
        <input type="text" value={input} onChange={(e)=> setInput(e.target.value)} />
        <button className='bg-blue-300 text-amber-50'
        onClick={}
        >Save </button>
    </div>
  )
}
