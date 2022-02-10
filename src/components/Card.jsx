import React from "react";

export default function Card(props) {
  const cardItem = {
    name: props.name,
    capital: props.capital && props.capital[0],
    region: props.region,
    population: props.population,
    flagImg: props.flagImg,
  };
  const card = props.card;
  return (
    <div className="card">
      <img className="card-img-top" src={cardItem.flagImg} alt="" />
      <div className="card-body">
        <h5 className="card-title">{cardItem.name}</h5>
        <p className="card-text">Capital : {cardItem.capital}</p>
        <p className="card-text">Region : {cardItem.region}</p>
        <p className="card-text">Population : {cardItem.population}</p>
        <button
          className="btn btn-primary"
          onClick={() => {
            props.showSelected(true);
            props.selectedCard(card);
          }}
        >
          Click for more info.
        </button>
      </div>
    </div>
  );
}
