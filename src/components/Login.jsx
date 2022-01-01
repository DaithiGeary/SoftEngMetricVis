import React from 'react'
import { login } from '../api/authentication'
export const Login = ({onClick}) => {
    return (
        <button onClick={()=>login().then((e)=>onClick?.(e))}>Login</button>
    )
}
