import Checkbox from "@mui/material/Checkbox";

// 0 a 12
function OneFingerFlathand() {
  const imageNames = [
    "../../images/image015.png",
    "../../images/image016.png",
    "../../images/image017.png",
    "../../images/image018.png",
    "../../images/image019.png",
    "../../images/image020.png",
    "../../images/image021.png",
    "../../images/image022.png",
    "../../images/image023.png",
    "../../images/image024.png",
    "../../images/image025.png",
    "../../images/image026.png",
    "../../images/image027.png",
    "../../images/image028.png",
    "../../images/image029.png",
    "../../images/image030.png",
    "../../images/image031.png",
    "../../images/image032.png",
    "../../images/image033.png",
    "../../images/image034.png",
  ];



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

export default OneFingerFlathand;
