import React, { useState } from 'react'
import Information from './Info'


export default function SearchFilter() {
    const [search, setSearch] = useState("")

    const elementStyle = {
        border: 'solid',
        borderRadius: '10px',
        position: 'relative',
        left: '10vh',
        height: '3vh',
        width: '20vh',
        marginTop: '5vh',
        marginBottom: '10vh',

    }

    let items = Information.filter((data) => {
        if (search === "") {
            return
        }
        else {
            if (data.name.toLowerCase().includes(search.toLowerCase()) || data.country.toLowerCase().includes(search.toLowerCase())) {
                return data
            }
        }
    }).map(data => {
        return (
            <div className="container">
                <ul>
                    <li style={{ position: 'relative', left: '10vh' }}>
                        <span style={{ left: '10vw' }}>{data.name}</span>
                        <span style={{ left: '10px' }}>{data.country}</span>
                        <span style={{ left: '10px' }}>{data.age}</span>
                    </li>
                </ul>
            </div>

        )
    })



    return (
        <div>
            <input type='text'
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                style={elementStyle}></input>
            {items}
        </div>
    )
}
