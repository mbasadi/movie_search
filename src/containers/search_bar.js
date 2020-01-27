import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Fetchingdata } from '../actions/index'
import { bindActionCreators } from 'redux'
import '../assets/styles/searchBar.scss';
class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { term: '' };
  }
  componentDidMount() {
    this.props.Fetchingdata('INTFETCH_MOVIE')
  }
  onInputChange(event) {
    this.setState({ term: event.target.value })
    if (event.target.value.length === 0) {
      return this.props.Fetchingdata('INTFETCH_MOVIE')
    } else {
      return this.props.Fetchingdata('SEARCH_MOVIE', event.target.value);
    }
  }

  render() {
    return (
      <div className={"searchBarContainer"}>
        <input
          placeholder="Search a Movie"
          className="from-control"
          value={this.state.term}
          onChange={(event)=>this.onInputChange(event)}
        />
      </div>
    )

  }
}
function mapStateToProps(state) {
  return {
    movies: state.movies
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ Fetchingdata: Fetchingdata }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
