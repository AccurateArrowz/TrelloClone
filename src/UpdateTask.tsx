import type { HandleUpdateTask, UUID } from './types'
import React, { useState } from 'react'

type UpdateTaskProps = {
    id: UUID, 
    groupId: UUID;
    text: string, 
    onTaskUpdate: HandleUpdateTask;
    onCancelUpdateTask: () => void;
};

export default function UpdateTask({id, groupId, text, onTaskUpdate, onCancelUpdateTask}: UpdateTaskProps) {
    const [input , setInput] = useState(text);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (input.trim() && input !== text) {
                onTaskUpdate({ taskId: id as UUID, groupId: groupId as UUID, newValue: input.trim() });
            }
            onCancelUpdateTask();
        } else if (e.key === 'Escape') {
            onCancelUpdateTask();
        }
    };

  return (
    <div style={{ width: '100%' }}>
        <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
                if (input.trim() && input !== text) {
                    onTaskUpdate({ taskId: id as UUID, groupId: groupId as UUID, newValue: input.trim() });
                }
                onCancelUpdateTask();
            }}
            autoFocus
            style={{ width: '100%', boxSizing: 'border-box' }}
        />
    </div>
  )
}
