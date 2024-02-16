import Checkbox from "@mui/material/Checkbox";

// 0 a 12
function ZeroFingersFlathand() {
  const imageNames = [
    "../../images/image001.png",
    "../../images/image002.png",
    "../../images/image003.png",
    "../../images/image004.png",
    "../../images/image005.png",
    "../../images/image006.png",
    "../../images/image007.png",
    "../../images/image008.png",
    "../../images/image009.png",
    "../../images/image010.png",
    "../../images/image011.png",
    "../../images/image012.png",
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

export default ZeroFingersFlathand;
