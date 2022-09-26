import React, {FC,useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props{
  source: object;
  sourcekey: string;
  i: number;
  sourceObjectIndex: number;
  allSources: object[];
  setAllSources: any
}

const EditSources:FC<Props> = ({source,sourcekey,i,sourceObjectIndex,allSources,setAllSources}) => {

  const handleChange = (event) => {
    source[sourcekey] = event.target.value;
    allSources[sourceObjectIndex] = source;
    setAllSources(allSources);
    console.log(allSources);
  };
  return (
    <>
      {sourcekey === "messages" && (
        <>
          <br></br>
          <h5>
            <strong>Messages</strong>
          </h5>
          {source[sourcekey].map((message: object[], messageIndex: number) => {
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
        source[sourcekey].dataLocation.dataFiles.map((data: string[], i: number) => {
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
