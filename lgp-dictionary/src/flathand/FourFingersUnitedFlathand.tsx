import Checkbox from "@mui/material/Checkbox";

// 0 a 12
function FourFingersUnitedFlathand() {
  const imageNames = [
    "../../images/image078.png",
    "../../images/image079.png",
    "../../images/image080.png",
    "../../images/image081.png",
    "../../images/image082.png",
    "../../images/image083.png",
    "../../images/image084.png",
    "../../images/image085.png",
    "../../images/image086.png",
    "../../images/image087.png",
    "../../images/image088.png",
    "../../images/image089.png",
    "../../images/image090.png",
    "../../images/image091.png",
    "../../images/image092.png",
    "../../images/image267.png",
    "../../images/image268.png",
  ];

  return (
    <div>
      <h3>4 dedos unidos</h3>
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

export default FourFingersUnitedFlathand;
