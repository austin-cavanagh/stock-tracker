import React, { useEffect, useState } from 'react';
import bullIcon from '../assets/bull-icon.png';
import searchIcon from '../assets/search-icon.png';
import IncomeStatement from './incomeStatement.js';
import BalanceSheet from './BalanceSheet';
import CashFlowStatement from './CashFlowStatement';
import LineChart from './LineChart';

const chartTypes = {
  '1D': 'oneDayChart',
  '5D': 'fiveDayChart',
  '1M': 'oneMonthChart',
  '6M': 'sixMonthChart',
  '1Y': 'oneYearChart',
  '5Y': 'fiveYearChart',
  Max: 'maxChart',
};

const chartTitle = {
  oneDayChart: 'Price History - One Day',
  fiveDayChart: 'Price History - Five Day',
  oneMonthChart: '1M Price History (One Month)',
  sixMonthChart: '6M Price History (Six Month)',
  oneYearChart: '1Y Price History',
  fiveYearChart: '5Y Price History',
  maxChart: 'Max Price History',
};

const App = () => {
  const [tickerData, setTickerData] = useState();
  const [chartType, setChartType] = useState('oneDayChart');

  // useEffect(() => {

  // }, [chartType]);

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

  console.log(chartType);

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
              <button type="submit" className="search-button">
                <img src={searchIcon} className="search-icon" />
              </button>
              <input
                type="text"
                className="search-input"
                placeholder="Ticker"
                name="query"
              />
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
          {/* {tickerData && tickerData.incomeStatement && (
            <IncomeStatement incomeStatement={tickerData.incomeStatement} />
          )}
          {tickerData && tickerData.balanceSheet && (
            <BalanceSheet balanceSheet={tickerData.balanceSheet} />
          )}
          {tickerData && tickerData.cashFlowStatement && (
            <CashFlowStatement balanceSheet={tickerData.cashFlowStatement} />
          )} */}

          {tickerData && tickerData.maxChart && (
            <>
              <h2 className="financial-statement-title">Price History</h2>

              <LineChart chartData={tickerData[chartType]} />
              <div className="chart-selector">
                <div
                  className={`chart-type ${
                    chartType === chartTypes['1D'] ? 'selected' : ''
                  }`}
                  onClick={() => setChartType(chartTypes['1D'])}
                >
                  1D
                </div>
                <div
                  className={`chart-type ${
                    chartType === chartTypes['5D'] ? 'selected' : ''
                  }`}
                  onClick={() => setChartType(chartTypes['5D'])}
                >
                  5D
                </div>
                <div
                  className={`chart-type ${
                    chartType === chartTypes['1M'] ? 'selected' : ''
                  }`}
                  onClick={() => setChartType(chartTypes['1M'])}
                >
                  1M
                </div>
                <div
                  className={`chart-type ${
                    chartType === chartTypes['6M'] ? 'selected' : ''
                  }`}
                  onClick={() => setChartType(chartTypes['6M'])}
                >
                  6M
                </div>
                <div
                  className={`chart-type ${
                    chartType === chartTypes['1Y'] ? 'selected' : ''
                  }`}
                  onClick={() => setChartType(chartTypes['1Y'])}
                >
                  1Y
                </div>
                <div
                  className={`chart-type ${
                    chartType === chartTypes['5Y'] ? 'selected' : ''
                  }`}
                  onClick={() => setChartType(chartTypes['5Y'])}
                >
                  5Y
                </div>
                <div
                  className={`chart-type ${
                    chartType === chartTypes['Max'] ? 'selected' : ''
                  }`}
                  onClick={() => setChartType(chartTypes['Max'])}
                >
                  Max
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
