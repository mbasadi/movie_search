import React, { Component } from 'react';
import SearchBar from '../containers/search_bar'
import MovLis from '../containers/MovLis'
import '../assets/styles/common.scss';
import '../assets/styles/app.scss'
export default class App extends Component {
  render() {
    return (
      <div >
        <SearchBar />
        <MovLis />
      </div>
    );
  }
}
