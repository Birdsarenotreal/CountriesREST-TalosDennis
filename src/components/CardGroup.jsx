import React from "react";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";

export default function CardGroup(props) {
  const items = () => {
    return props.data.map((el) => {
      console.log(el);
      return (
        <Card
          key={uuidv4()}
          capital={el.capital}
          name={el.name.common}
          region={el.region}
          population={el.population}
          flagImg={el.flags.svg}
        ></Card>
      );
    });
  };
  return <div className="card-deck">{items()};</div>;
}
