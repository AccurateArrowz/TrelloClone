import React, { useEffect, useRef, useState } from 'react'
import UserProfile from './UserProfile';

type User= {
    name: string,
    age: number
}

export default function UserSearchPage() {
    const [userId, setUserId] = useState<number>(1);
    const [user, setUser] = useState<User >({name: '', age:0});
    const abortControllerRef= useRef(null);
    const handleUserIdChange = (e)=> {
        const value = e.target.value;
        if(Number.isNaN(value)) return;
        setUserId(value);
    }
    const handleRefetch  =()=> {

    }

    useEffect(()=> {

        if(!abortControllerRef.current) {
            abortControllerRef.current = new AbortController();
        }

        const fetchUserById= async (id: number)=> {
            try {
                const result = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                    signal: abortControllerRef.current.signal;
                });
                const data = await result.json();
                console.log(data);
                return;
            }catch(error){
                console.log(error);
            }
        }       
        fetchUserById(userId);
        return ()=> {
            if(abortControllerRef.current)abortControllerRef.current.abort()
            }
    }, [userId])

  return (
    <div>
        <input type="number" value={userId} onChange={handleUserIdChange} />
        <UserProfile></UserProfile>
        <button onClick={handleRefetch}>Refetch</button>
    </div>
  )
}
