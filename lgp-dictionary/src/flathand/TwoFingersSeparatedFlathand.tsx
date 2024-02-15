import Checkbox from "@mui/material/Checkbox";

// 0 a 12
function TwoFingersSeparatedFlathand() {
  const imageNames = [
    "../../images/image052.png",
    "../../images/image053.png",
    "../../images/image054.png",
    "../../images/image055.png",
    "../../images/image056.png",
    "../../images/image063.png",
    "../../images/image064.png",
    "../../images/image065.png",
    "../../images/image066.png",
    "../../images/image067.png",
    "../../images/image068.png",
    "../../images/image069.png",
    "../../images/image070.png",
    "../../images/image071.png",
    "../../images/image072.png",
    "../../images/image073.png",
    "../../images/image074.png",
    "../../images/image075.png",
    "../../images/image076.png",
  ];

  return (
    <div>
      <h3>2 dedos espalhados</h3>
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

export default TwoFingersSeparatedFlathand;
