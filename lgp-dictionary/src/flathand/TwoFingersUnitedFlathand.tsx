import Checkbox from "@mui/material/Checkbox";

// 0 a 12
function TwoFingersUnitedFlathand() {
  const imageNames = [
    "../../images/image035.png",
    "../../images/image036.png",
    "../../images/image037.png",
    "../../images/image038.png",
    "../../images/image039.png",
    "../../images/image040.png",
    "../../images/image041.png",
    "../../images/image042.png",
    "../../images/image043.png",
    "../../images/image044.png",
    "../../images/image045.png",
    "../../images/image046.png",
    "../../images/image047.png",
    "../../images/image048.png",
    "../../images/image049.png",
    "../../images/image050.png",
    "../../images/image051.png",
  ];

  return (
    <div>
      <h3>2 dedos unidos</h3>
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

export default TwoFingersUnitedFlathand;
