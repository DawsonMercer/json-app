import React, { useEffect, useState } from "react";
import Source from "./Source";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FillableForm = () => {
  const [fileName, setFileName] = useState("");
  const [logLevel, setLogLevel] = useState("");
  const [port, setPort] = useState("");
  const [mmsiDBFolder, setMmsiDBFolder] = useState("");
  const [numOfSources, setNumOfSources] = useState(2);
  const [allSources, setAllSources] = useState([]);
  // const [sourceInfo, setSourceInfo] = useState([]);

  // let sourceInfo = []
  // const mapArray = [{1:1}, {2:2}, {3:3}, {4:4}, {5:5}]

  const displaySources = (event) => {
    // console.log(event.currentTarget.id);
    // setNumOfSources(event.currentTarget.value);
    // console.log(numOfSources)
  };

  useEffect(() => {
    // setSourceInfo([...Array(numOfSources).keys()])
  }, []);

  useEffect(() => {
    // console.log(numOfSources)
    // let newArray = [...Array(numOfSources).keys()]
    // console.log(newArray);
    // // setSourceInfo([...newArray])
    // console.log(sourceInfo);
  }, [numOfSources]);

  // const handleChange = (event) =>{
  //     console.log(event.target.value);
  //     console.log(event.target.value);
  //     setNumOfSources(event.target.value)

  //     console.log(numOfSources)

  // }

  const createJson = (event) => {
    event.preventDefault();
    const newFileName = fileName;
    const newFile = {
      logLevel: logLevel,
      port: port,
      Sources: allSources,
      mmsiDBFolder: mmsiDBFolder,
    };

    console.log(newFileName);
    console.log(newFile);
    // setFileName('')
    // setLogLevel('');
    // setPort('');
    // setMmsiDBFolder('')
    // setAllSources([]);

    axios
      .post(`/createFile/${newFileName}`, newFile)
      .then(() => {
        window.alert(`${newFileName}.json File Created`);
        console.log("File Created");
      })
      .catch((err) => {
        console.error(err);
      });

    // fetch(`/api/createFile/${newFileName}`,{
    //     method: "POST",
    //     body: JSON.stringify(newFile),

    //     headers: {'Content-type': 'application/json'}
    // })
    window.alert(`${newFileName}.json File Created`);
    window.location.reload();
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        textAlign: "center",
        border: "3px solid white",
      }}
    >
      <h1>Create a JSON file</h1>
      <div style={{ width: "65%", margin: "auto" }}>
        <Form
          id="createFileForm"
          method="post"
          encType="multipart/form-data"
          onSubmit={createJson}
        >
          <Form.Label>File Name</Form.Label>
          <Form.Control
            type="text"
            id="fileName"
            onChange={(e) => setFileName(e.target.value)}
          />

          <Form.Label>logLevel</Form.Label>
          <Form.Control
            type="text"
            id="logLevel"
            onChange={(e) => setLogLevel(e.target.value)}
          />

          <Form.Label>Port</Form.Label>
          <Form.Control
            type="text"
            id="port"
            onChange={(e) => setPort(e.target.value)}
          />
          <br />
          <Form.Label>mmsiDBFolder</Form.Label>
          <Form.Control
            type="text"
            id="mmsiDBFolder"
            onChange={(e) => setMmsiDBFolder(e.target.value)}
          />

          <Form.Label>Number of Sources:</Form.Label>
          <Form.Select
            id="numOfSources"
            defaultValue={numOfSources}
            onChange={(e) => {
              setNumOfSources(Number(e.target.value));
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
          <div id="allSources">
            <hr></hr>
            {[...Array(numOfSources).keys()].map((s, index) => {
              return (
                <>
                  <h3>Source {index + 1}</h3>
                  <Source
                    allSources={allSources}
                    setAllSources={setAllSources}
                  />
                </>
              );
            })}
          </div>
          <Button
            type="submit"
            id="submitButton"
            style={{ marginRight: "10%" }}
          >
            Create .json
          </Button>

          {/* <button type="button" id="nextButton">Next</button> */}
          <Button
            type="reset"
            id="resetButton"
            variant="warning"
            onClick={(e) => {
              window.location.reload();
            }}
          >
            Reset Form
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default FillableForm;
