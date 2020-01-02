import React, { Component } from 'react';
import SearchBar from '../containers/search_bar'
import MovLis from '../containers/MovLis'

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <MovLis />
      </div>
    );
  }
}
