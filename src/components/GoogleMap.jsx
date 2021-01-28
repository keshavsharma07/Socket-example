import React, { useEffect, useState } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, Polyline } from 'react-google-maps'
import socketIOClient from "socket.io-client";


const ENDPOINT = "https://52ae45abcff6.ngrok.io/";


const Map = () => {
    // const [path, setPath] = useState([])
    const [progress, setprogress] = useState([])
    // let a = []
    // let tempPath = []
    // let PolyPath = []

    let path = [
        { lat: 18.558908, lng: -68.389916 },
        { lat: 18.558853, lng: -68.389922 },
        { lat: 18.558375, lng: -68.389729 },
        { lat: 18.558032, lng: -68.389182 },
        { lat: 18.558050, lng: -68.388613 },
        { lat: 18.558256, lng: -68.388213 },
        { lat: 18.558744, lng: -68.387929 },
      ]
    // useEffect(() => {
    //     console.log("entered");
    //     const socket = socketIOClient(ENDPOINT);
    //     let id = {
    //         user_id: 5
    //     }

    //     try {
    //         socket.emit('fetchUserID', id);
    //         socket.on('getPosition', data => {
    //             console.log("in ")
    //             let test = JSON.parse(data);
    //             a.push({ lat: Number(test[0].lat), lng: Number(test[0].lng) })
    //             // console.log(a)
    //             tempPath = [...path];
    //             tempPath.push(a[a.length - 1]);
    //             PolyPath.push(a[a.length - 1]);
    //             setPath(tempPath);

    //         });
    //     }


    //     catch (error) {
    //         console.log(error);
    //     }
    //     return () => { socket.disconnect(); console.log("Disonnected") }
    // }, []);
    // console.log(path)

    const velocity = 5
    let initialDate = new Date()

    let getDistance = () => {
        // seconds between when the component loaded and now
        const differentInTime = (new Date() - initialDate) / 1000 // pass to seconds
        return differentInTime * velocity // d = v*t -- thanks Newton!
    }

    useEffect(() => {
        let interval = window.setInterval(moveObject, 1000)

        return ()=> window.clearInterval(interval)
    })

    let moveObject = () => {
        const distance = getDistance()
        if (!distance) {
            return
        }

        let progress = path.filter(coordinates => coordinates.distance < distance)

        const nextLine = path.find(coordinates => coordinates.distance > distance)
        if (!nextLine) {
            setprogress({ progress })
            return // it's the end!
        }
        const lastLine = progress[progress.length - 1]

        const lastLineLatLng = new window.google.maps.LatLng(
            lastLine.lat,
            lastLine.lng
        )

        const nextLineLatLng = new window.google.maps.LatLng(
            nextLine.lat,
            nextLine.lng
        )

        // distance of this line 
        const totalDistance = nextLine.distance - lastLine.distance
        const percentage = (distance - lastLine.distance) / totalDistance

        const position = window.google.maps.geometry.spherical.interpolate(
            lastLineLatLng,
            nextLineLatLng,
            percentage
        )

        progress = progress.concat(position)
        setprogress({ progress })
    }

    useEffect(() => {
        path = path.map((coordinates, i, array) => {
            if (i === 0) {
                return { ...coordinates, distance: 0 } // it begins here! 
            }
            const { lat: lat1, lng: lng1 } = coordinates
            const latLong1 = new window.google.maps.LatLng(lat1, lng1)

            const { lat: lat2, lng: lng2 } = array[0]
            const latLong2 = new window.google.maps.LatLng(lat2, lng2)

            // in meters:
            const distance = Window.google.maps.geometry.spherical.computeDistanceBetween(
                latLong1,
                latLong2
            )
                
            return { ...coordinates, distance }
        })

        console.log(path)
    })
    return (
        <div className="map">
            <GoogleMap
                defaultZoom={13}
                defaultCenter={{ lat: 30.70363037870437, lng: 76.72211 }}
            >
               {progress && (
            <>
              <Polyline path={progress} options={{ strokeColor: "#FF0000 "}} />
              <Marker position={progress[progress.length - 1]} />
            </>
          )}
            </GoogleMap>
        </div>
    )
}


const MapComponent = withScriptjs(withGoogleMap(Map))
export default () => (
    <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=AIzaSyBAAbhxDfNqUcrYWHpQPU_qyDl0nNIuu8c"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh`, width: '100vw' }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
)