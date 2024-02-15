import Checkbox from "@mui/material/Checkbox";

// 0 a 12
function FourFingersSeparatedFlathand() {
  const imageNames = [
    "../../images/image167.png",
    "../../images/image168.png",
    "../../images/image169.png",
    "../../images/image170.png",
    "../../images/image171.png",
    "../../images/image172.png",
    "../../images/image173.png",
    "../../images/image174.png",
    "../../images/image175.png",
    "../../images/image176.png",
    "../../images/image177.png",
    "../../images/image178.png",
    "../../images/image179.png",
    "../../images/image180.png",
    "../../images/image181.png",
    "../../images/image182.png",
    "../../images/image183.png",
    "../../images/image184.png",
    "../../images/image185.png",
    "../../images/image186.png",
    "../../images/image187.png",
    "../../images/image188.png",
    "../../images/image189.png",
  ];

  return (
    <div>
      <h3>4 dedos espalhados</h3>
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

export default FourFingersSeparatedFlathand;
