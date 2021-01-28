import React from 'react'


const formInputs =[
    {id:'name',type:'text' ,label:'Your name' }
    ,{id:'tel',type:'tel' ,label:'Phone' }
    ,{id:'email',type:'email' ,label:'Email' }
    ,{id:'message',type:'textarea' ,label:'Your message' }

]


function Form() {
    return (
        <form className="form">
            <h2 className="form-h2">Contact me</h2>
            {formInputs.map(input=>(
                <label key={input.label} id ={input.id} className="form-label">
                    {input.label}

                    {input.type === 'textarea' ?(
                        <textarea className="form-textarea" placeholder={input.placeholder}></textarea>
                    ):(
                        <input className="form-input"
                        type={input.type}
                        placeholder={input.placeholder}>
                        </input>
                    )}

                </label>
            ))}

        </form>
    )
}

export default Form
