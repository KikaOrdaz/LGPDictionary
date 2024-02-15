import "./App.css";
import { useState } from "react";
import { withTheme } from "@emotion/react";
import Box from "@mui/system/Box";
import upload from "./assets/square.and.arrow.up.svg";
import ZeroFingersFlathand from "./flathand/ZeroFingersFlathand";
import OneFingerFlathand from "./flathand/OneFingerFlathand";
import TwoFingersSeparatedFlathand from "./flathand/TwoFingersSeparatedFlathand";
import TwoFingersUnitedFlathand from "./flathand/TwoFingersUnitedFlathand";
import FourFingersSeparatedFlathand from "./flathand/FourFingersSeparatedFlathand";
import FourFingersUnitedFlathand from "./flathand/FourFingersUnitedFlathand";
import OneFingerClosed from "./oposable-thumb/OneFingerClosed";
import OneFingerExtended from "./oposable-thumb/OneFingerExtended";
import TwoFingersUnited from "./oposable-thumb/TwoFingersUnited";
import FourFingersUnited from "./oposable-thumb/FourFingersUnited";
import Select from "react-select";

function UploadGesture() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const configurations = [
    { value: "ZeroFingersFlathand", label: "ZeroFingersFlathand" },
    { value: "OneFingerFlathand", label: "OneFingerFlathand" },
    {
      value: "TwoFingersSeparatedFlathand",
      label: "TwoFingersSeparatedFlathand",
    },
    { value: "TwoFingersUnitedFlathand", label: "TwoFingersUnitedFlathand" },
    {
      value: "FourFingersSeparatedFlathand",
      label: "FourFingersSeparatedFlathand",
    },
    { value: "FourFingersUnitedFlathand", label: "FourFingersUnitedFlathand" },
  ];

  return (
    <div>
      <Box
        component="section"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          height: "100px",
          width: "100px",
          padding: "16px",
          "&:hover": {
            backgroundColor: "primary.light",
          },
        }}
      >
        <img src={upload} className="upload" alt="" />
      </Box>

      <Select options={configurations} />
      {/*<div>
        <h2>Flathand</h2>
        <ZeroFingersFlathand />
        <OneFingerFlathand />
        <TwoFingersSeparatedFlathand />
        <TwoFingersUnitedFlathand />
        <FourFingersSeparatedFlathand />
        <FourFingersUnitedFlathand />
      </div>

      <div>
        <h2>Oposable Thumb</h2>
        <OneFingerClosed />
        <OneFingerExtended />
        <TwoFingersUnited />
        <FourFingersUnited />
      </div>*/}
    </div>
  );
}

export default UploadGesture;
