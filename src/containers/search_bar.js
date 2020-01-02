import React,{Component} from 'react';
import { connect } from 'react-redux'
import {Fetchingdata} from '../actions/index'
import {bindActionCreators} from 'redux'
class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state={term:''};
    this.onInputChange=this.onInputChange.bind(this);
  }
  componentDidMount() {
    this.props.Fetchingdata('INTFETCH_MOVIE')
  }
  onInputChange(event){
    this.setState({term:event.target.value})
    if (event.target.value.length===0){
    return this.props.Fetchingdata('INTFETCH_MOVIE')
    }else{
      return  this.props.Fetchingdata('SEARCH_MOVIE',event.target.value);
    }
  }

  render () {
    return(
      <input
      placeholder="movie or TV show"
      className="from-control"
      value={this.state.term}
      onChange={this.onInputChange}
      />
  )

  }
}
function mapStateToProps (state) {
  return {
     movies:state.movies
    // asdf:'123'
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators ({Fetchingdata:Fetchingdata},dispatch)
}
export default connect (mapStateToProps,mapDispatchToProps)(SearchBar);
