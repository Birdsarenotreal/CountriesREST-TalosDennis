import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CardGroup from "./CardGroup";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadCountries() {
      let response = await axios.get("https://restcountries.com/v3.1/all");
      response = await response;
      setCards(response.data);
    }
    loadCountries();
  }, []);

  return (
    <div className="container py-2">
      <CardGroup data={cards}></CardGroup>
    </div>
  );
}
