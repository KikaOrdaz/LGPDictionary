import Checkbox from "@mui/material/Checkbox";

// 0 a 12
function OneFingerClosed() {
  const imageNames = [
    "../../images/image120.png",
    "../../images/image121.png",
    "../../images/image122.png",
    "../../images/image123.png",
    "../../images/image124.png",
    "../../images/image125.png",
    "../../images/image126.png",
    "../../images/image127.png",
    "../../images/image128.png",
    "../../images/image129.png",
    "../../images/image130.png",
    "../../images/image131.png",
    "../../images/image132.png",
    "../../images/image133.png",
  ];

  return (
    <div>
      <h3>1 dedo, outros fechados</h3>
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

export default OneFingerClosed;
