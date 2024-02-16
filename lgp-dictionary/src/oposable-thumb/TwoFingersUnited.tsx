import Checkbox from "@mui/material/Checkbox";

// 0 a 12
function TwoFingersUnited() {
  const imageNames = [
    "../../images/image154.png",
    "../../images/image155.png",
    "../../images/image156.png",
    "../../images/image157.png",
    "../../images/image158.png",
    "../../images/image159.png",
    "../../images/image161.png",
    "../../images/image162.png",
    "../../images/image163.png",
    "../../images/image164.png",
    "../../images/image165.png",
    "../../images/image166.png",
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

export default TwoFingersUnited;
