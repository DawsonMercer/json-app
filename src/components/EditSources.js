import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EditSources = ({
  source,
  sourcekey,
  i,
  sourceObjectIndex,
  allSources,
  setAllSources,
}) => {
  const [sourceKeyValue, setSourceKeyValue] = useState("");

  const handleChange = (event, path) => {
    // let sourcePath = path !== undefined ? source[sourcekey].path : source[sourcekey]
    // if(sourcekey === "message"){
    //     source[sourcekey][path]
    // }
    source[sourcekey] = event.target.value;
    allSources[sourceObjectIndex] = source;
    setAllSources(allSources);
    // console.log(allSources[sourceObjectIndex])
    console.log(allSources);
  };

  useEffect(() => {
    // console.log(source)
    // console.log(allSources[sourceObjectIndex])
  }, []);

  useEffect(() => {
    // console.log(sourceKeyValue)
    // console.log(source[sourcekey])
  }, [sourceKeyValue]);

  return (
    <>
      {sourcekey === "messages" && (
        <>
          <br></br>
          <h5>
            <strong>Messages</strong>
          </h5>
          {source[sourcekey].map((message, messageIndex) => {
            return Object.keys(message).map((messagekey, mk) => {
              return (
                <>
                  {/* <Form.Label>
                    <strong>{messagekey}</strong>
                  </Form.Label> */}
                  <br></br>
                  {/* <label><strong>{messagekey[mk]}</strong></label> */}
                  {Object.keys(message[messagekey]).map((m, mi) => {
                    // console.log(Object.entries(message[messagekey])[mi][0]);
                    return (
                      <>
                        <Form.Label>
                          <strong>{messagekey}</strong> -
                          {Object.entries(message[messagekey])[mi][0]}
                        </Form.Label>
                        <Form.Control
                          defaultValue={message[messagekey][m]}
                          onChange={(event) => {
                            console.log(
                              source[sourcekey][messageIndex][messagekey][m]
                            );
                            source[sourcekey][messageIndex][messagekey][m] =
                              event.target.value;

                            allSources[sourceObjectIndex] = source;
                            setAllSources(allSources);
                            console.log(allSources);
                          }}
                        ></Form.Control>
                      </>
                    );
                  })}
                </>
              );

              // console.log(message[key]);
              // message[key].map((field)=>{
              //     console.log(field);
              // })
            });
          })}
        </>
      )}
      {sourcekey === "type" && (
        <>
          <Form.Label>
            Type: <strong>{source[sourcekey]}</strong>
          </Form.Label>
          <br></br>
        </>
      )}
      {sourcekey === "file" &&
        source[sourcekey].dataLocation !== undefined &&
        source[sourcekey].dataLocation.dataFiles.map((data, i) => {
          return (
            <>
              <br></br>
              <Form.Label>dataLocation.dataFiles</Form.Label>
              <Form.Control
                defaultValue={data}
                onChange={(event) => {
                  console.log(event.target.value);
                  source[sourcekey].dataLocation.dataFiles[i] =
                    event.target.value;
                  console.log(source[sourcekey].dataLocation.dataFiles);
                  allSources[sourceObjectIndex] = source;
                  setAllSources(allSources);
                  console.log(allSources);
                }}
              />
            </>
          );
        })}
      {sourcekey !== "type" &&
        sourcekey !== "messages" &&
        typeof source[sourcekey] !== "object" && (
          <>
            <Form.Label>{sourcekey}</Form.Label>
            <Form.Control
              type="text"
              defaultValue={source[sourcekey]}
              onChange={handleChange}
            />
          </>
        )}
    </>
  );
};

export default EditSources;
