import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CardGroup from "./CardGroup";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterItems, setFilterItems] = useState([]);
  const [regions, setRegions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [timeZones, setTimeZones] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [f1, setF1] = useState("");
  const [f2, setF2] = useState("");
  const [f3, setF3] = useState("");
  const [f4, setF4] = useState("");
  const [show, setShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeMin = (e) => {
    setMin(e.target.value);
  };

  const onChangeMax = (e) => {
    setMax(e.target.value);
  };

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

  const popLang = () => {
    const auxLanguages = cards
      .map((el) => {
        if (el.languages) {
          return Object.values(el.languages);
        } else {
          return [];
        }
      })
      .flat();
    setLanguages([...new Set(auxLanguages.map((item) => item))].sort());
  };
  const popReg = () => {
    const auxReg = cards.map((el) => el.region);
    setRegions([...new Set(auxReg.map((item) => item))].sort());
  };

  const popTime = () => {
    const auxTime = cards.map((el) => el.timezones).flat();
    auxTime.forEach((el) => el.trim());
    setTimeZones([...new Set(auxTime.map((item) => item))].sort());
  };

  const popMoney = () => {
    const auxMoney = cards
      .map((el) => {
        if (el.currencies) {
          return Object.keys(el.currencies);
        } else {
          return [];
        }
      })
      .flat();
    setCurrencies([...new Set(auxMoney.map((item) => item))].sort());
  };
  const reset = () => {
    setFilterItems(cards);
  };
  const onChangeF1 = (e) => {
    setF1(e.target.value);
  };

  const onChangeF2 = (e) => {
    setF2(e.target.value);
  };

  const onChangeF3 = (e) => {
    setF3(e.target.value);
  };

  const onChangeF4 = (e) => {
    setF4(e.target.value);
  };
  const compareCurrency = (a, b) => {
    let test = [];
    console.log(a, b);
    if (a.currencies) {
      test.concat(Object.keys(a.currencies));
    }
    if (test.includes(b)) return true;

    return false;
  };

  const compareLanguage = (a, b) => {
    let test = [];

    if (a.languages === null || a.languages === undefined) {
      return false;
    } else {
      test = Object.values(a.languages);
    }

    if (test.includes(b)) return true;
    console.log(test);
    return false;
  };

  const allFilters = () => {
    setFilterItems(cards);
    // setFilterItems(
    //   filterItems.filter((el) => compareLanguage(el.languages, f1))
    // );
    // setFilterItems(
    //   filterItems.filter((el) => compareCurrency(el.currencies, f2))
    // );
    setFilterItems(
      filterItems.filter((el) => el.population >= min && el.population <= max)
    );
    setFilterItems(filterItems.filter((el) => el.region === f3));
    setFilterItems(filterItems.filter((el) => el.timezones[0] === f4));
  };

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
      <NavFilters
        className=""
        regions={regions}
        languages={languages}
        timeZones={timeZones}
        currencies={currencies}
        min={min}
        max={max}
        onChangeMax={onChangeMax}
        onChangeMin={onChangeMin}
        test={popLang}
        region={popReg}
        time={popTime}
        money={popMoney}
        reset={reset}
        all={allFilters}
        sf1={onChangeF1}
        sf2={onChangeF2}
        sf3={onChangeF3}
        sf4={onChangeF4}
      ></NavFilters>
      {show && <Modal card={selectedCard}></Modal>}
      <Search value={searchTerm} onChangeHandler={onChangeSearchTerm}></Search>
      {filterItems.length <= 0 && <h3 className="h3 m-3">No country found!</h3>}
      {filterItems.length > 0 && (
        <CardGroup
          data={filterItems}
          filterTerm={searchTerm}
          selectedCard={setSelectedCard}
          show={setShow}
        ></CardGroup>
      )}
    </div>
  );
}

const Search = (props) => {
  return (
    <div className="row">
      <div className="form-group col-10-lg">
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

const NavFilters = (props) => {
  return (
    <div className="row pb-2">
      <div className="col-4">
        <form className="form-inline">
          <div className="input-group">
            <input
              className="form-control"
              placeholder="Minimum pop."
              value={props.min}
              onChange={props.onChangeMin}
            />
            <input
              className="form-control"
              placeholder="Maximum pop."
              value={props.max}
              onChange={props.onChangeMax}
            />
          </div>
        </form>
      </div>
      <div className="col-1">
        <select
          className="custom-select"
          id="inputGroupSelect04"
          onChange={props.sf3}
        >
          {props.regions.map((el) => {
            return (
              <option placeholder="Select region." value={el} key={el}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-2">
        <select className="custom-select" id="inputGroupSelect04">
          {props.languages.map((el) => {
            return (
              <option placeholder="Select language." value={el} key={el}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-1">
        <select
          className="custom-select"
          id="inputGroupSelect04"
          onChange={props.sf4}
        >
          {props.timeZones.map((el) => {
            return (
              <option placeholder="Select time zone." value={el} key={el}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-1">
        <select className="custom-select" id="inputGroupSelect04">
          {props.currencies.map((el) => {
            return (
              <option placeholder="Select currency." value={el} key={el}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-1">
        <button
          className="btn btn-primary"
          onClick={() => {
            props.all();
          }}
        >
          Apply filters.
        </button>
      </div>
      <div className="col-1">
        <button
          className="btn btn-primary"
          onClick={() => {
            props.reset();
          }}
        >
          Reset the cards.
        </button>
      </div>
      <div className="col-1">
        <button
          className="btn btn-info"
          onClick={() => {
            props.test();
            props.region();
            props.time();
            props.money();
          }}
        >
          Populate filters.
        </button>
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="card">
          <img className="card-img-top" src={""} alt="" />
          <div className="card-body">
            <h5 className="card-title">{""}</h5>
            <p className="card-text">Capital : {""}</p>
            <p className="card-text">Region : {""}</p>
            <p className="card-text">Population : {""}</p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
