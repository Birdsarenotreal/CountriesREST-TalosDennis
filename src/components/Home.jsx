import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CardGroup from "./CardGroup";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterItems, setFilterItems] = useState([]);
  const [found, setFound] = useState(true);

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  function compare(a, b) {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    setFilterItems(cards);
    setFilterItems(
      cards.filter(
        (el) =>
          el.name.common === searchTerm ||
          (el.capital && el.capital[0]) === searchTerm
      )
    );
    if (searchTerm === "") {
      setFilterItems(cards);
    }
  }, [searchTerm]);

  useEffect(() => {
    async function loadCountries() {
      let response = await axios.get("https://restcountries.com/v3.1/all");
      response = await response;
      setCards(response.data.sort(compare));
      setFilterItems(response.data.sort(compare));
    }
    loadCountries();
  }, []);

  return (
    <div className="container py-2">
      <Search value={searchTerm} onChangeHandler={onChangeSearchTerm}></Search>
      {filterItems.length <= 0 && <h3 className="h3 m-3">No country found!</h3>}
      {filterItems.length > 0 && (
        <CardGroup data={filterItems} filterTerm={searchTerm}></CardGroup>
      )}
    </div>
  );
}

const Search = (props) => {
  return (
    <div className="row">
      <div className="form-group col-10">
        <input
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Search by Name/Capital."
          value={props.searchTerm}
          onChange={props.onChangeHandler}
        />
      </div>
    </div>
  );
};
