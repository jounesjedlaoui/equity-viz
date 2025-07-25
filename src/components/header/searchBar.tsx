import { useState, type ChangeEvent, type MouseEventHandler } from "react";
import "./header.css";
import { getItem } from "../../modules/api";
import type { PolygonSearchResponse } from "../../types/types";
import { useGlobalStore } from "../../modules/store";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState<PolygonSearchResponse[] | null>()
  const {selectedTicker, setSelectedTicker} = useGlobalStore();
  
  function updateInputField(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.toUpperCase();
    if (val.length > 0) {
      setValue(val);
    } else {
      setValue('');
      setSearchResults(null);
    }
    
  }

  async function searchSymbols() {
    const searchString = document.getElementById('searchBar')!.getAttribute('value')
    console.log(searchString)

    if(searchString) {
      setValue(searchString);
  
      if(searchString.length > 0) {
          const res = await getItem({
            url:
              "https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&order=asc&limit=100&sort=ticker" +
              `&ticker=${searchString}`,
          });
      
          console.log(res);
          
          const sr: PolygonSearchResponse[] = res.results.map(r => {return {
            active: r.active,
            currency_name: r.currency_name,
            last_updated_utc: new Date(r.last_updated_utc),
            locale: r.locale,
            market: r.market,
            name: r.name,
            primary_exchange: r.primary_exchange,
            share_class_figi: r.share_class_figi,
            ticker: r.ticker,
            type: r.type,
          }})
  
          setSearchResults(sr)
      }
      else {
        setSearchResults([]);
      }
    };

  } 

  function selectTicker(ticker: string) {
    setSelectedTicker(ticker);
    setSearchResults([]);
  }


  return (
    <>
    <div className="searchBar">
      <input
        id="searchBar"
        className="searchBarInput"
        type="search"
        value={value}
        placeholder="Search Symbols"
        onChange={updateInputField}
        onKeyDown={e => e.keyCode === 13 ? searchSymbols() : null}
      />
      <button onClick={searchSymbols}>Search</button>

    </div>
      <div className="search-results">
        {searchResults?.map(sr => {
            return (
            <div className="sr" key={sr.ticker} onClick={() => selectTicker(sr.ticker)}>
              <div className="sr-title">
                  <h3>{sr.ticker}</h3>
                <div className="sr-title-ticker">
                  <p>{sr.name}</p>
                </div>
              </div>
              
              <p>{sr.locale.toUpperCase()}</p>
              <p>{sr.currency_name.toUpperCase()}</p>
              <p>{sr.primary_exchange}</p>
              <div className="sr-is-active">
                <div  style={{backgroundColor: sr.active ? 'green' : 'red'}}></div>
                <p>{sr.last_updated_utc.toLocaleTimeString().slice(0, 5)}h</p> 
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}
