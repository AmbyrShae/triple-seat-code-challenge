import logo from './logo.svg';
// Components
import React, { Component } from 'react';
import Search from './components/Search';
import StockTable from './components/StockTable';
// Stylesheets
import './stylesheets/App.scss';
class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <Search></Search>
        <StockTable></StockTable>
      </header>
    </div>
    );
  }
}

export default App;
