import Checkboxes from "./components/Checkboxes";
import { title } from "process";


function Locations() {
  const imageNames = [
    "../../images/locations/location-1.png",
    "../../images/locations/location-2.png",
    "../../images/locations/location-3.png",
    "../../images/locations/location-4.png",
    "../../images/locations/location-5.png",
    "../../images/locations/location-6.png",
    "../../images/locations/location-7.png",
    "../../images/locations/location-8.png",
    "../../images/locations/location-9.png",
    "../../images/locations/location-10.png",
    "../../images/locations/location-11.png",
    "../../images/locations/location-12.png",
    "../../images/locations/location-13.png",
    "../../images/locations/location-14.png",
    "../../images/locations/location-15.png",
    "../../images/locations/location-16.png",
    "../../images/locations/location-17.png",
    "../../images/locations/location-18.png",
    "../../images/locations/location-19.png",
    "../../images/locations/location-20.png",
    "../../images/locations/location-21.png",
    "../../images/locations/location-22.png",
    "../../images/locations/location-23.png",
    "../../images/locations/location-24.png",
    "../../images/locations/location-25.png",
    "../../images/locations/location-26.png",
    "../../images/locations/location-27.png",
    "../../images/locations/location-28.png",
    "../../images/locations/location-29.png",
    "../../images/locations/location-30.png",
  ];

  return (
    <div>
      <Checkboxes imageNames={imageNames}/>
    </div>
  );
}

export default Locations;
