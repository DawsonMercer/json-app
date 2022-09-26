import React, { FC, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
// @ts-ignore
import EditSources from "./EditSources.tsx";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface FileObject{
  logLevel: string;
  port: number;
  Sources: object[];
  mmsiDBFolder: string;

}

// Component loads in config.json and displays its infomation in a form
// upon submit, a new file is created. 

const EditFile: FC = () => {
  // @ts-ignore
  const [fileInfo, setFileInfo] = useState<FileObject>({});
  const [logLevel, setLogLevel] = useState<string>("");
  const [port, setPort] = useState<string>("");
  const [mmsiDBFolder, setMmsiDBFolder] = useState<string>("");
  const [allSources, setAllSources] = useState<object[]>([]);

  // load in the config.json and set variable states that is used to fill out form
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/db/config.json")
        .then((res) => {
          setFileInfo(res.data);
          setAllSources(res.data.Sources);
          setLogLevel(res.data.logLevel);
          setPort(res.data.port);
          setMmsiDBFolder(res.data.mmsiDBFolder);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  // update the create a new config file on button submit
  const updateFile = async (newFile) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.put(
        "http://localhost:3001/updateFile",
        newFile,
        config
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // handle form submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    const newFile = {
      logLevel: logLevel,
      port: port,
      Sources: allSources,
      mmsiDBFolder: mmsiDBFolder,
    };
    console.log(newFile);
    updateFile(newFile);
  };

  if (!fileInfo || !allSources) {
    return <h1>No File Selected</h1>;
  }
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(black, navy, black)",
        color: "white",
      }}
    >
      <br></br>
      <div
        style={{
          width: "50%",
          margin: "auto",
          textAlign: "center",
          border: "3px solid white",
        }}
      >
        <h1>Edit Config File</h1>
        {fileInfo && (
          <div style={{ width: "65%", margin: "auto" }}>
            <Form>
              <Form.Label>logLevel</Form.Label>
              <Form.Control
                type="text"
                defaultValue={fileInfo.logLevel}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogLevel(e.target.value)}
              />

              <Form.Label>port</Form.Label>
              <Form.Control
                type="text"
                defaultValue={fileInfo.port}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPort(e.target.value)}
              />

              <Form.Label>mmsiFolder</Form.Label>
              <Form.Control
                type="text"
                defaultValue={fileInfo.mmsiDBFolder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMmsiDBFolder(e.target.value)}
              />
              {allSources.map((source, index) => {
                return (
                  <>
                    <br></br>
                    <h3>Source {index + 1}</h3>
                    {Object.keys(source).map((key, i) => {
                      return (
                        <EditSources
                          source={source}
                          sourcekey={key}
                          i={i}
                          sourceObjectIndex={index}
                          allSources={allSources}
                          setAllSources={setAllSources}
                        />
                      );
                    })}

                    <br></br>
                    <br></br>
                    <br></br>
                    <hr />
                  </>
                );
              })}

              <Button type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
            <br></br>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditFile;
