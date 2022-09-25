import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import EditSources from "./EditSources";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EditFile = () => {
  const [fileInfo, setFileInfo] = useState({});
  const [logLevel, setLogLevel] = useState("");
  const [port, setPort] = useState("");
  const [mmsiDBFolder, setMmsiDBFolder] = useState("");
  const [allSources, setAllSources] = useState([]);

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
    console.log(fileInfo);
    console.log(fileInfo.Sources);

    fetchData();
    console.log("use effect engaged");
  }, []);

  const onRemove = (e, toRemove, index) => {
    // const updatedSources = fileInfo.Sources.slice(0, index-1).concat(fileInfo.Sources.slice(index, fileInfo.Sources.length))
    // console.log(updatedSources);
    // console.log(index)
    // const removeIndex = allSources.splice(index,1)
    // console.log(removeIndex)
    // console.log(allSources)
    // setAllSources(allSources)
    e.preventDefault();

    allSources.splice(index, 1);
    console.log(allSources);
    fileInfo.Sources = allSources;
    console.log(fileInfo);
    setFileInfo(fileInfo);
    // setAllSources(allSources);
    e.target.textContent = "Source Removed";
    e.target.disabled = true;

    // setFileInfo();
    console.log(toRemove);
  };

  const updateFile = async (newFile) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.put(
        "http://localhost:3001/update-File",
        newFile,
        config
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    // await fetch(`/updateFile`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newFile),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newFile = {
      logLevel: logLevel,
      port: port,
      mmsiDBFolder: mmsiDBFolder,
      Sources: allSources,
    };
    console.log(newFile);
    updateFile(newFile);
  };
  useEffect(() => {
    console.log(allSources);
    console.log(fileInfo.Sources);
    // const newFileInfo = {
    //     logLevel: fileInfo.logLevel,
    //     port: fileInfo.port,
    //     Sources: allSources,
    //     mmsiDBFolder: fileInfo.mmsiDBFolder
    // }
    // setFileInfo(newFileInfo)
  }, [allSources]);

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
                onChange={(e) => setLogLevel(e.target.value)}
              />

              <Form.Label>port</Form.Label>
              <Form.Control
                type="text"
                defaultValue={fileInfo.port}
                onChange={(e) => setPort(e.target.value)}
              />

              <Form.Label>mmsiFolder</Form.Label>
              <Form.Control
                type="text"
                defaultValue={fileInfo.mmsiDBFolder}
                onChange={(e) => setMmsiDBFolder(e.target.value)}
              />
              {allSources.map((source, index) => {
                // console.log(allSources[index]);
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
                      // return(
                      //     <>

                      //         {key === "messages" &&
                      //         <>
                      //         <label><strong>{key}</strong></label>
                      //         {/* {key.map((message, messageIndex)=>{
                      //             <>
                      //             <h1>poop</h1>
                      //             <input defaultValue={message}/>
                      //             </>
                      //         })} */}

                      //         </>
                      //         }
                      //         {key === 'type' &&
                      //         <>
                      //         <h4>Type: <strong>{source[key]}</strong></h4>
                      //         </>}
                      //         {key !== 'type' && key!== 'messages' &&
                      //         <>
                      //         <label>{key}</label>
                      //         <input type="text" defaultValue={source[key]}/>
                      //         </>
                      //         }
                      //     </>
                      // )
                    })}
                    {/* <button onClick={confirmInfo}>Confirm Source</button> */}
                    <br></br>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={(e) => onRemove(e, source, index)}
                    >
                      Remove Source {index + 1}
                    </Button>
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
