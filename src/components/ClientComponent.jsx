import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import geolocation from 'geolocation';

import moment from 'moment';
const ENDPOINT = "https://878ae622b73d.ngrok.io/";


function ClientComponent() {
    // const [response, setResponse] = useState("");
    // let post = [];
    // useEffect(() => {
        let post = [
            { lat: 30.71663208336884, lng: 76.74440099775535, user_id: 5 },
            { lat: 30.703542742430045, lng: 76.78892645527286, user_id: 5 },
            { lat: 30.71663208336884, lng: 76.74440099775535, user_id: 5 },
            { lat: 30.703542742430045, lng: 76.78892645527286, user_id: 5 },
            { lat: 30.69022944781214, lng: 76.71058506915391, user_id: 5 },
            { lat: 30.691262770837223, lng: 76.71215147918964, user_id: 5 },
            { lat: 30.694205835619943, lng: 76.7167970651175, user_id: 5 }

        ];
        // const socket = socketIOClient(ENDPOINT);
        // let i = 0;
        // const interval = setInterval(() => {
        //     if (i < post.length) {
        //         console.log(post[i])
        //         socket.emit('position', post[i])
        //         ++i
        //     }
        //     else {
        //         console.log("out")
        //         clearInterval(interval)
        //     }
        // }, 6000);


    //     return () => { socket.disconnect(); console.log("Disonnected") }
    // }, []);




    return (
        <div>
          <ul>{post}</ul>
        </div>
    )

}

export default ClientComponent;