import Checkboxes from "./components/Checkboxes";
import { title } from "process";


function Orientations() {
  const imageNames = [
    "../../images/orientations/orientation-1.png",
    "../../images/orientations/orientation-2.png",
    "../../images/orientations/orientation-3.png",
    "../../images/orientations/orientation-4.png",
    "../../images/orientations/orientation-5.png",
    "../../images/orientations/orientation-6.png",
    "../../images/orientations/orientation-7.png",
    "../../images/orientations/orientation-8.png",
    "../../images/orientations/orientation-9.png",
    "../../images/orientations/orientation-10.png",
    "../../images/orientations/orientation-11.png",
    "../../images/orientations/orientation-12.png",
    "../../images/orientations/orientation-13.png",
    "../../images/orientations/orientation-14.png",
    "../../images/orientations/orientation-15.png",
    "../../images/orientations/orientation-16.png",
    "../../images/orientations/orientation-17.png",
    "../../images/orientations/orientation-18.png",
    "../../images/orientations/orientation-19.png",
    "../../images/orientations/orientation-20.png",
    "../../images/orientations/orientation-21.png",
    "../../images/orientations/orientation-22.png",
    "../../images/orientations/orientation-23.png",
    "../../images/orientations/orientation-24.png",
    "../../images/orientations/orientation-25.png",
    "../../images/orientations/orientation-26.png",
    "../../images/orientations/orientation-27.png",
    "../../images/orientations/orientation-28.png",
    "../../images/orientations/orientation-29.png",
    "../../images/orientations/orientation-30.png",
    "../../images/orientations/orientation-31.png",
    "../../images/orientations/orientation-32.png",
  ];

  return (
    <div className="img">
      <Checkboxes imageNames={imageNames}/>
    </div>
  );
}

export default Orientations;
