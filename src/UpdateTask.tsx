import type { HandleUpdateTask, UUID } from './types'
import React, { useState } from 'react'

type UpdateTaskProps = {
    id: UUID, 
    text: string, 
    onTaskUpdate : HandleUpdateTask;
    onCancelUpdateTask: ()=> void;
};

export default function UpdateTask({id, text}: UpdateTaskProps) {
    const [input , setInput] = useState(value);
  return (
    <div>
        <input type="text" value={input} onChange={(e)=> setInput(e.target.value)} />
        <button className='bg-blue-300 text-amber-50'

        >Save </button>
    </div>
  )
}
