import React from 'react';
import bullIcon from '../assets/bull-icon.png';
import searchIcon from '../assets/search-icon.png';

const App = () => (
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
        <form
          className="search-container"
          action="/api/fetch-data"
          method="get"
        >
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
  </div>
);

export default App;
