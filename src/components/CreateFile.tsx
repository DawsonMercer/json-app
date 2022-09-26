import React, {FC} from "react";
// @ts-ignore
import FillableForm from "./FillableForm.tsx";
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
