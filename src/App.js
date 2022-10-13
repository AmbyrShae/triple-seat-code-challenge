// Components
import React, { Component } from 'react';
import { Subject, filter, debounceTime, bufferTime, map } from 'rxjs';
import Search from './components/Search';
import StockTable, { mock } from './components/StockTable';
// Stylesheets
import './stylesheets/App.scss';
class App extends Component {
  constructor() {
    super();
    this.state = {
      assets: {},
      sortColumn: '',
      favorites: JSON.parse(window.localStorage.getItem('favorites')) || {},
      filter: '',
      debounce: '',
    };

    this.onFilter$ = new Subject();
    this.filterAssets = this.filterAssets.bind(this);
  }

  filterAssets(value) {
    const filter = value;
    this.setState({ filter });
    this.onFilter$.next(filter);
    this.setState({
      sortColumn: 'id',
    });
  }

  componentDidMount() {
    this.onFilter$.pipe(debounceTime(500)).subscribe((debounce) => {
      this.setState({ debounce: debounce.toLowerCase() });
    });

    mock
      .pipe(bufferTime(200))
      .pipe(filter((items) => items.length))
      .pipe(map((items) => {
        let assets = {};
        items.forEach((item) => {
          assets[item.id] = item;
          // console.log(item.lastUpdate)
          assets[item.id].lastUpdate = this.formatDate(item.lastUpdate);
        });
        return { ...this.state.assets, ...assets };
      }))
      .subscribe((assets) => {
        this.setState({ assets });
      });
  }

  formatDate(date) {
    // console.log(date)
    let d = new Date(date);
    return (
      d.getMonth() +
      '/' +
      d.getDate() +
      '/' +
      d.getFullYear() +
      ' ' +
      d.getDay() +
      ':' +
      d.getMinutes() +
      ':' +
      d.getSeconds()
    );
  }

  getData() {
    let keys = Object.keys(this.state.assets);

    if (this.state.debounce) {
      keys = this.filterAssetsByInputText(keys);
    }

    if (this.state.sortColumn) {
      keys = this.sortAssetByColumn(keys);
    }

    if (Object.keys(this.state.favorites).length) {
      keys = this.sortAssetsByFavorite(keys);
    }

    return keys.map((key) => this.state.assets[key]);
  }

  render() {
   const rows = this.getData().map((row) => {
      // console.log(row)
      return (row);
    })
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
