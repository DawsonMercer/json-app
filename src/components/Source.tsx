import React, {FC, useEffect, useState, useCallback } from "react";
import { getDropdownMenuPlacement } from "react-bootstrap/esm/DropdownMenu";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props{
  setAllSources;
  allSources;
  index: number;
}

interface SourceObject{
  type: string;
  messages: object[];

}
interface AivdMessagesObject{
  type: string | null;
}
interface GpggaMessagesObject{
  type: string | null;
  hololensPositionSource: null| string| boolean;
}

// Component that handles creation of individual sources
const Source: FC<Props> = ({ setAllSources, allSources, index }) => {
  const [labels, setLabels] = useState<string[]>(["file", "delay", "messages"]);
  const [type, setType] = useState<string>("file");
  const [messages] = useState<object[]>([]);
  const [aivdmMessages] = useState<AivdMessagesObject>({ type: "" });
  const [gpggaMessages] = useState<GpggaMessagesObject>({ type: "", hololensPositionSource: null });
  let source= {};

  // handles change of the Source Type
  const handleChange = (event) => {
    let key = event.currentTarget.id;
    source[key] = event.currentTarget.value;
  };

  // confirms Source info to be added to the file
  const confirmInfo = (event) => {
    event.preventDefault();
    // @ts-ignore
    source.type = type;
    if (type === "file" || type === "TCP" || type==="UDP") {
      // @ts-ignore
      source.messages = messages;
    }
    setAllSources([...allSources, source]);
    event.target.textContent = "Source Confirmed";
    event.target.disabled = true;
    let typeSelect = document.getElementById(`sourceType${index}`);
    // @ts-ignore
    typeSelect.disabled = true;
  };

  // get the type labels for the source 
  const getTypeLabels = (type: string) => {
    if (type === "file") {
      setLabels(["file", "delay", "messages"]);
    }
    if (type === "fixedPosition") {
      setLabels(["hololensPositionSource", "lat", "lon"]);
    }
    if (type === "remoteRadar") {
      setLabels(["hololensPositionSource", "address"]);
    }
    if (type === "localRadar") {
      setLabels(["hololensPositionSource", "radar_object_name", "file"]);
    }
    if (type === "TCP") {
      setLabels(["address", "port", "messages"]);
    }
    if (type === "UDP") {
      setLabels(["logFile", "port", "messages"]);
    }
  };

  // handles the change of the Source Type to display correct fields
  const changeType = (event) => {
    setType(event.target.value);
    getTypeLabels(type);
  };

  // update type labels on change
  useEffect(() => {
    getTypeLabels(type);
  }, [type]);

  return (
    <>
      <Form.Label>Source Type:</Form.Label>
      <Form.Select id={`sourceType${index}`} onChange={changeType}>
        <option value="file">File</option>
        <option value="fixedPosition">Fixed Position</option>
        <option value="remoteRadar">Remote Radar</option>
        <option value="localRadar">Local Radar</option>
        <option value="TCP">TCP</option>
        <option value="UDP">UDP</option>
      </Form.Select>
      <br></br>
      {labels.map((label) => {
        return (
          <>
            {label === "messages" && (
              <>
                <h5>
                  <strong>Messages</strong>
                </h5>
                <Form.Label>
                  <strong>!AIVDM</strong>
                </Form.Label>
                <Form.Label> - Type</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    aivdmMessages.type = e.target.value;
                    messages[0] = { "!AIVDM": aivdmMessages };
                  }}
                />
                <Form.Label>
                  <strong>$GPGGA</strong> - Type
                </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // setAivdmMessages({"$GPGGA":{"type": e.target.value}});
                    gpggaMessages.type = e.target.value;
                    messages[1] = { $GPGGA: gpggaMessages };
                  }}
                />
                <Form.Label>
                  <strong>$GPGGA</strong> - hololensPositionSource
                </Form.Label>
                <Form.Select
                  onChange={(e: React.ChangeEvent) => {
                    const target = e.target as HTMLTextAreaElement;
                    gpggaMessages.hololensPositionSource = target.value;
                    messages[1] = { $GPGGA: gpggaMessages };
                  }}
                >
                  <option value={""}></option>
                  <option value={"true"}>true</option>
                  <option value={"false"}>false</option>
                </Form.Select>
                
              </>
            )}
            {label !== "messages" && (
              <>
                <Form.Label>{label}</Form.Label>
                <Form.Control type="text" id={`${label}`} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>handleChange(event)} />
                <br></br>
              </>
            )}
          </>
        );
      })}
      <br></br>
      <Button onClick={confirmInfo} size="sm" variant="primary">
        Confirm Source Info
      </Button>
      <br></br>
      <hr></hr>
    </>
  );
};

export default Source;
