import React from "react";

export default function Card(props) {
  const cardItem = {
    name: props.name,
    capital: props.capital && props.capital[0],
    region: props.region,
    population: props.population,
    flagImg: props.flagImg,
  };

  return (
    <div className="card">
      <img className="card-img-top" src={cardItem.flagImg} alt="" />
      <div className="card-body">
        <h5 className="card-title">{cardItem.name}</h5>
        <p className="card-text">Capital : {cardItem.capital}</p>
        <p className="card-text">Region : {cardItem.region}</p>
        <p className="card-text">Population : {cardItem.population}</p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}
