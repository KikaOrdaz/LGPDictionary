import "./Accordion.css";
import { useState } from "react";
import React from "react";

function Accordion({data} : {data:  { content: React.ReactNode, label: string }[]}) {
  const [selected, setSelected] = useState(null);

  const toggle = (i: any) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  return (
    <div className="wrapper">
      <div className="accordion">
        {data.map((item, i) => (
          <div className="item">
            <div className="title" onClick={() => toggle(i)}>
              <h2>{item.label}</h2>
              <span>{selected === i ? "-" : "+"}</span>
            </div>
            <div className={selected === i ? "content show" : "content"}>
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accordion;

