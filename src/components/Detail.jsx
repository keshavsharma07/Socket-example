import React from 'react'
import ReactHtmlParser from 'react-html-parser'


export default function Detail({ user }) {


    return (
        <div>
            Hello {ReactHtmlParser(user)}
        </div>
    )
}
