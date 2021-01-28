import react, { Component, useState, useEffect } from "react";
import { CircularProgress } from '@material-ui/core';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"

import './App.css';
import Header from './components/header/headr';
import ContactMe from './components/content/contactMe';
import ClientComponent from './components/ClientComponent';
import Map from "./components/maps";
import geolocation from 'geolocation';
import GoogleMap from "./components/GoogleMap";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/WebsiteComponent/Home";
import Services from "./components/WebsiteComponent/Services";
import Contact from "./components/WebsiteComponent/Contact";
import About from "./components/WebsiteComponent/About";
import Navbar from "./components/WebsiteComponent/Navbar";
import Text from "./Test";
import PassFunctionParent from "./components/PassFunctionParent";
import Detail from "./components/Detail";
import Editor from "./components/Editor/Editor";
import SearchFilter from "./components/SearchFilter/SearchFilter";
import CkEditor from "./components/Editor/CkEditor";
// import { Switch,Route } from "react-router-dom";

const App = () => {


  // return (
  //   <>

  //       <Navbar></Navbar>
  //     <Switch>
  //       <Route exact path="/" component={Home}></Route>
  //       <Route exact path="/services" component={Services}></Route>
  //       <Route exact path="/contact" component={Contact}></Route>
  //       <Route exact path="/about" component={About}></Route>
  //       <Redirect to="/"></Redirect>
  //     </Switch>
  //   </>
  // );


  const [loadClient, setLoadClient] = useState(true);
  const [location, setLocation] = useState({
    lat: 30.738270,
    lng: 76.765144,
  });

  const [loadlocation, setLoadLocation] = useState(true);
  const [user, setUser] = useState()
  return (
    <div className="App">
      {/* <button onClick={() => setLoadLocation(prevState => !prevState)}>Get/Stop  location</button> */}
      {/* <button onClick={() => setLoadClient(prevState => !prevState)}>Send/Stop Location </button> */}
      {/* <ClientComponent></ClientComponent> */}
      {/* {loadClient ? <ClientComponent></ClientComponent> : <div> Stopped </div>} */}
      {/* <div style={{ width: '100vw', height: '100vh' }}>

           <Map location={location} zoomLevel={17}></Map>

         </div> */}

      {user ? <div>{user}</div> : <CkEditor login={a1 => setUser(a1)} />}


      {/* <Switch>
           <Route exact path="/details" component={Detail}/>
         </Switch> */}


      {/* <CkEditor></CkEditor> */}
      {/* <Editor></Editor> */}
      {/* <SearchFilter></SearchFilter> */}
      {/* {loadlocation ? <Map/> : null} */}
    </div>


  );





}



export default App;
