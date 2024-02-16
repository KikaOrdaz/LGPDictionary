import Checkbox from "@mui/material/Checkbox";

// 0 a 12
function OneFingerExtended() {
  const imageNames = [
    "../../images/image134.png",
    "../../images/image135.png",
    "../../images/image136.png",
    "../../images/image137.png",
    "../../images/image138.png",
    "../../images/image139.png",
    "../../images/image140.png",
    "../../images/image141.png",
    "../../images/image142.png",
    "../../images/image143.png",
    "../../images/image144.png",
    "../../images/image145.png",
    "../../images/image146.png",
    "../../images/image147.png",
    "../../images/image148.png",
    "../../images/image149.png",
    "../../images/image150.png",
    "../../images/image151.png",
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

export default OneFingerExtended;
