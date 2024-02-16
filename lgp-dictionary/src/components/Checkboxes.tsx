import Checkbox from "@mui/material/Checkbox";
import React from "react";


function Checkboxes({imageNames} : {imageNames: string[]}) {


  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        {imageNames.map((imageName, index) => (
          <li key={index}>
            <Checkbox />
            <img src={imageName} alt={imageName} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Checkboxes;
