import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker, Polyline } from 'react-google-maps'


class Map extends React.Component {
  state = {
    progress: [],
  }

  path = [
    { lat: 30.6907645628983, lng: 76.71153993537696 },
    { lat: 30.693301706140872, lng: 76.71535940121228 },
    { lat: 30.69817283432684, lng: 76.72306270540287 },
    // { lat: 18.558032, lng: -68.389182 },
    // { lat: 18.558050, lng: -68.388613 },
    // { lat: 18.558256, lng: -68.388213 },
    // { lat: 18.558744, lng: -68.387929 },
  ]

  velocity = 50
  initialDate = new Date()

  getDistance = () => {
    
    const differentInTime = (new Date() - this.initialDate) / 1000 
    return differentInTime * this.velocity 
  }

  componentDidMount = () => {
    this.interval = window.setInterval(this.moveObject, 1000)
  }

  componentWillUnmount = () => {
    window.clearInterval(this.interval)
  }

  moveObject = () => {
    const distance = this.getDistance()
    if (!distance) {
      return
    }

    let progress = this.path.filter(coordinates => coordinates.distance < distance)

    const nextLine = this.path.find(coordinates => coordinates.distance > distance)
    if (!nextLine) {
      this.setState({ progress })
      return 
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

  
    const totalDistance = nextLine.distance - lastLine.distance
    const percentage = (distance - lastLine.distance) / totalDistance

    const position = window.google.maps.geometry.spherical.interpolate(
      lastLineLatLng,
      nextLineLatLng,
      percentage
    )

    progress = progress.concat(position)
    this.setState({ progress })
  }

  componentWillMount = () => {
    this.path = this.path.map((coordinates, i, array) => {
      if (i === 0) {
        return { ...coordinates, distance: 0 } // it begins here! 
      }
      const { lat: lat1, lng: lng1 } = coordinates
      const latLong1 = new window.google.maps.LatLng(lat1, lng1)

      const { lat: lat2, lng: lng2 } = array[0]
      const latLong2 = new window.google.maps.LatLng(lat2, lng2)

      
      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
        latLong1,
        latLong2
      )

      return { ...coordinates, distance }
    })

    console.log(this.path)
  }

  render = () => {
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 30.6907645628983, lng: 76.71153993537696 }}
      >
        { this.state.progress && (
          <>
            <Polyline path={this.state.progress} options={{ strokeColor: "black " }} />
            <Marker position={this.state.progress[this.state.progress.length - 1]} />
          </>
        )}
      </GoogleMap>
    )
  }
}

const MapComponent = withScriptjs(withGoogleMap(Map))

export default () => (
  <MapComponent
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100vh`, width: '100vw' }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
)
