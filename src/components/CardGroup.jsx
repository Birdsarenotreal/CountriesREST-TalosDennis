import React from "react";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";

export default function CardGroup(props) {
  const items = () => {
    return props.data.map((el) => {
      return (
        <Card
          key={el.area + el.population}
          capital={el.capital}
          name={el.name.common}
          region={el.region}
          population={el.population}
          flagImg={el.flags.svg}
          area={el.area}
          showSelected={props.show}
          selectedCard={props.selectedCard}
          card={el}
        ></Card>
      );
    });
  };
  return <div className="card-deck">{items()}</div>;
}
