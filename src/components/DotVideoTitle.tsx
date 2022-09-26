import React, {FC} from "react";
// @ts-ignore
import VideoDot from "../images/VideoDots.mp4";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const DotVideoTitle: FC = () => {
  let words: string = "";
  switch (window.location.pathname) {
    case "/":
      words = "Editor";
      break;
    case "/edit":
      words = "Editor";
      break;
    case "/create":
      words = "Creator";
      break;
  }
  return (
    <>
      <div className="containerVid">
        <div className="overlay">
          <h1 className="topText">JSON File</h1>
          <h1 id="blueH1" style={{ textAlign: "center" }} className="topText">
            {words}.
          </h1>
        </div>
        <video
          preload="true"
          height=""
          width="100%"
          autoPlay
          muted
          loop
        >
          <source src={VideoDot} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default DotVideoTitle;
