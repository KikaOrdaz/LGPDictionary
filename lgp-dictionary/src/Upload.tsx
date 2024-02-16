import "./App.css";
import { useState } from "react";
import { withTheme } from "@emotion/react";
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
import Accordion from "./components/Accordion";
import Locations from "./Locations";
import Orientations from "./Orientations";

function UploadGesture() {


  const flathandConfigurations = [
    {content: <ZeroFingersFlathand />, label: "0 dedos"},
    {content: <OneFingerFlathand />, label: "1 dedo"},
    {content: <TwoFingersSeparatedFlathand />, label: "2 dedos espalhados"},
    {content: <TwoFingersUnitedFlathand />, label: "2 dedos unidos"},
    {content: <FourFingersSeparatedFlathand />, label: "4 dedos espalhados"},
    {content: <FourFingersUnitedFlathand />, label: "4 dedos unidos"}
  ];

  const oposableConfiguration = [
    {content: <OneFingerClosed />, label: "1 dedo, outros fechados"},
    {content: <OneFingerExtended />, label: "1 dedo, outros extendidos"},
    {content: <TwoFingersUnited />, label: "2 dedos"},
    {content: <FourFingersUnited />, label: "4 dedos"}
  ];

  const locations = [
    {content: <Locations/>, label: "Localizações"}
  ]

  const orientations = [
    {content: <Orientations/>, label: "Orientações"}
  ]

  return (
    <div>
      <h1>Configurações</h1>
      <h2>Flathand</h2>
      <Accordion data={flathandConfigurations}/>
      <h2>Oposable Thumb</h2>
      <Accordion data={oposableConfiguration}/>
      <h1></h1>
      <Accordion data={locations}/>
      <h1></h1>
      <Accordion data={orientations}/>
    
    </div>
  );
}

export default UploadGesture;
