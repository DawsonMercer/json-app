import axios from "axios";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import EditFile from "./components/EditFile";
import CreateFile from "./components/CreateFile";
import NavBar from "./components/NavBar";
import DotVideoTitle from "./components/DotVideoTitle";
import Squares from "../../json-app/src/images/Squares.png";
// import { Button } from "react-bootstrap"
import VideoDot from "../../../frontend/json-app/src/images/VideoDots.mp4";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [displayEdit, setDisplayEdit] = useState(false);
  const [displayCreate, setDisplayCreate] = useState(false);

  const handleEdit = () => {
    console.log(displayEdit);
    if (!displayEdit) {
      setDisplayEdit(true);
    } else {
      setDisplayEdit(false);
    }
  };

  const handleCreate = () => {
    if (!displayCreate) {
      setDisplayCreate(true);
    } else {
      setDisplayCreate(false);
    }
  };
  // const handleClick = (display, setDisplay) =>{
  //   if(!display){
  //     setDisplay(true)
  //   }
  //   else{
  //     setDisplay(false)
  //   }
  // }

  return (
    <>
      <NavBar />
      <DotVideoTitle />
      <Routes>
        <Route path="/" element={<EditFile />} />
        <Route path="/create" element={<CreateFile />} />
      </Routes>

      {/* <DotVideoTitle /> */}
      {/* <div
        style={{
          backgroundImage: "linear-gradient(black, navy, black)",
          color: "white",
        }}
      >
        <EditFile />
      </div>
      <div
        style={{
          // backgroundImage: "linear-gradient(black, navy, black)",
          color: "white",
          background: "url(images/Squares.png) black",
        }}
      >
        <CreateFile />
      </div> */}

      <img src={Squares} width="100%" />
      {/* <video height="" width="100%" autoPlay muted loop>
        <source src={VideoDot} type="video/mp4" />
      </video> */}
      {/* <input type="file" /> */}
      {/* <button onClick={handleEdit}>Edit File</button>{" "}
      <button onClick={handleCreate}>Create File</button>
      <div>{displayEdit && <EditFile />}</div>
      <div>{displayCreate && <CreateFile />}</div> */}
    </>
  );
}

export default App;
