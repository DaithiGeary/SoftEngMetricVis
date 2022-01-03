import React from 'react'
import { login } from '../api/authentication'
export const Login = ({onClick}) => {
    return (
        <div className='flexwrapper'>
            <h2>
                Metric Visualiser
            </h2>
            <button onClick={()=>login().then((e)=>onClick?.(e))}>Login</button>
        </div>
      
    )
}
