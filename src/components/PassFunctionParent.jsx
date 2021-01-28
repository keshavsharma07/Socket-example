import React, { useState } from 'react'
import Detail from './Detail'
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form";



function PassFunctionParent({ login }) {
    const [username, setUsername] = useState("")
    const [lastname, setLastname] = useState("")
    const [text, setText] = useState("")
    const history = useHistory();
    const sendProps = () => {
        history.push('/details')

    }
    const { register, setValue, handleSubmit, reset, errors } = useForm();


    
  const obj = {
    username,
    lastname,
    text,
  };

  const Submit=(data) => {
      login(data)
    }

    return (
        <form onSubmit={handleSubmit(Submit)}>
            <input
                type="text"
                required="required"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                ref={register(obj.username)}
            />
            <input
                type="text"
                required="required"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                ref={register(obj.lastname)}

            />
            <input
                type="text"
                required="required"
                onChange={(e) => setText(e.target.value)}
                value={text}
                ref={register(obj.text)}

/>

            <button type="submit" >Send</button>
        </form>
    )
}


export default PassFunctionParent
