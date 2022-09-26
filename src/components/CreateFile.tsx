import React, {FC} from "react";
// @ts-ignore
import FillableForm from "./FillableForm.tsx";

// Simple Component that renders the FillableForm for creating a file
const CreateFile: FC = () => {
  return (
    <div
      style={{
        color: "white",
        background: "url(images/Squares.png) black",
      }}
    >
      <br></br>
      <FillableForm />
    </div>
  );
};

export default CreateFile;
