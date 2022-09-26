import React, {FC} from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props{
  source: object;
  sourcekey: string;
  i: number;
  sourceObjectIndex: number;
  allSources: object[];
  setAllSources: any
}

// Component that parses source info into form inputs
const EditSources:FC<Props> = ({source,sourcekey,i,sourceObjectIndex,allSources,setAllSources}) => {

  // handles change of form inputs
  const handleChange = (event) => {
    source[sourcekey] = event.target.value;
    allSources[sourceObjectIndex] = source;
    setAllSources(allSources);
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
                  <br></br>
                  {Object.keys(message[messagekey]).map((m, mi) => {
                    return (
                      <>
                        <Form.Label>
                          <strong>{messagekey}</strong> -
                          {Object.entries(message[messagekey])[mi][0]}
                        </Form.Label>
                        <Form.Control
                          defaultValue={message[messagekey][m]}
                          onChange={(event) => {
                            source[sourcekey][messageIndex][messagekey][m] =
                              event.target.value;

                            allSources[sourceObjectIndex] = source;
                            setAllSources(allSources);
                          }}
                        ></Form.Control>
                      </>
                    );
                  })}
                </>
              );
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
                  source[sourcekey].dataLocation.dataFiles[i] =
                    event.target.value;
                  allSources[sourceObjectIndex] = source;
                  setAllSources(allSources);
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
