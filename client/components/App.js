import React, { useState } from 'react';
import bullIcon from '../assets/bull-icon.png';
import searchIcon from '../assets/search-icon.png';
import IncomeStatement from './incomeStatement.js';
import BalanceSheet from './BalanceSheet';
import CashFlowStatement from './CashFlowStatement';

const App = () => {
  const [tickerData, setTickerData] = useState();

  const getTickerData = async event => {
    event.preventDefault();

    try {
      const ticker = event.target.query.value;
      const response = await fetch(`/api/fetch-data?query=${ticker}`);
      const data = await response.json();

      setTickerData(data);
    } catch (error) {
      console.error('Error Fetching Data:', error);
    }
  };

  console.log(tickerData);
  // if (tickerData) console.log(tickerData.incomeStatement);

  return (
    <>
      <div className="window">
        <nav className="nav-bar">
          <div className="left-nav">
            <div
              className="bull-icon"
              style={{ backgroundImage: `url(${bullIcon})` }}
            ></div>
            <span className="company">Ticker Tracker</span>
          </div>
          <div className="right-nav">
            <form className="search-container" onSubmit={getTickerData}>
              <input
                type="text"
                className="search-input"
                placeholder="Ticker..."
                name="query"
              />
              <button type="submit" className="search-button">
                <img src={searchIcon} className="search-icon" />
              </button>
            </form>
            <div className="separator"></div>
            <div className="nav-options">
              <a href="/watchlist" className="nav-button">
                Watchlist
              </a>
              <div className="separator"></div>
              <a href="/logout" className="nav-button">
                Logout
              </a>
            </div>
          </div>
        </nav>

        <div className="content">
          {tickerData && tickerData.incomeStatement && (
            <IncomeStatement incomeStatement={tickerData.incomeStatement} />
          )}
          {tickerData && tickerData.balanceSheet && (
            <BalanceSheet balanceSheet={tickerData.balanceSheet} />
          )}
          {tickerData && tickerData.cashFlowStatement && (
            <CashFlowStatement balanceSheet={tickerData.cashFlowStatement} />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
