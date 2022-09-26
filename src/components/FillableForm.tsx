import React, { FC, useEffect, useState } from "react";
// @ts-ignore
import Source from "./Source.tsx";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


// Component that handles the creation of the file
const FillableForm: FC = () => {
  const [fileName, setFileName] = useState<string | null>("");
  const [logLevel, setLogLevel] = useState<string | null>("");
  const [port, setPort] = useState<number | null| string>(null);
  const [mmsiDBFolder, setMmsiDBFolder] = useState<string | null>("");
  const [numOfSources, setNumOfSources] = useState<number>(2);
  const [allSources, setAllSources] = useState<object[]>([]);

  // on submit handles creation of json file
  // makes node call to server to create the file
  const createJson = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFileName = fileName;
    const newFile = {
      logLevel: logLevel,
      port: port,
      Sources: allSources,
      mmsiDBFolder: mmsiDBFolder,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:3001/createFile/${newFileName}`,
        newFile,
        config
      );
      console.log(response);
      window.alert(`${newFileName}.json File Created`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFileName(e.target.value)}
          />

          <Form.Label>logLevel</Form.Label>
          <Form.Control
            type="text"
            id="logLevel"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogLevel(e.target.value)}
          />

          <Form.Label>Port</Form.Label>
          <Form.Control
            type="text"
            id="port"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPort(e.target.value)}
          />
          <br />
          <Form.Label>mmsiDBFolder</Form.Label>
          <Form.Control
            type="text"
            id="mmsiDBFolder"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMmsiDBFolder(e.target.value)}
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
            <option value="6">6</option>
          </Form.Select>
          <div id="allSources">
            <hr></hr>
            {[...Array(numOfSources).keys()].map((s, index:number) => {
              return (
                <>
                  <h3>Source {index + 1}</h3>
                  <Source
                    allSources={allSources}
                    setAllSources={setAllSources}
                    index={index}
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
