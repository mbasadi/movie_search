import React, { Component } from "react";
import './App.css';
import { connect } from 'react-redux'
import { Fetchingdata, Postingdata } from '../actions/index'
import { bindActionCreators } from 'redux'
class Bagher extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.containermethod = this.containermethod.bind(this);
  }
  componentDidMount() {
    this.props.Fetchingdata('INTFETCH_MOVIE');
    this.props.Fetchingdata('FAVEFETCH_MOVIE');
    this.props.Fetchingdata('SAVEFETCH_MOVIE');
  }
  handleClick(type, movie, buttonText) {
    // first determind wich botton is clicked then change the botton text, post data based on request and get the new list of liked and saved list
    if (type === "like") {
      let boulL = false;
      if (buttonText === "unlike") {
         boulL = false;
      } else {
        boulL = true;
      }
      this.props.Postingdata('FAVEPOST_MOVIE',movie.id, boulL);
      this.props.Fetchingdata('FAVEFETCH_MOVIE');
    } else {
      let boulL = false;
      if (buttonText === "unsave") {
         boulL = false;
      } else {
        boulL = true;
      }
      this.props.Postingdata('SAVEPOST_MOVIE',movie.id, boulL);
      this.props.Fetchingdata('SAVEFETCH_MOVIE');
    }
  };
  render() {
    return (
//defining the "containermethod" to bulit the cards and compare the current list of movie with lists of liked and saved movies
      <div>
        {this.containermethod(this.props.movies, this.props.favemovie, this.props.savemovie)}
      </div>

    );
  }
  containermethod(MoviesL, Movfave, Movsave) {
    const fmovies = MoviesL[0];
    const fave = Movfave[0];
    const savei = Movsave[0];
    if (!fmovies) {
      return <div>Loading...</div>;
    }
    if (!fave) {
      return <div>Loading...</div>;
    }
    if (!savei) {
      return <div>Loading...</div>;
    }
    //comparing lists and determined the botton state
    const picItems = fmovies.results.map(movie => {
      let buttonText1 = 'like';
      let buttonText2 = 'save';
      fave.results.map(ffa => {
        if (movie.id === ffa.id) {
          buttonText1 = 'unlike';
        }
      })
      savei.results.map(Saa => {
        if (movie.id === Saa.id) {
          buttonText2 = 'unsave';
        }
      })

      if (movie.poster_path === null) {
        return (
          <div key={movie.id} className="card" >
            <div className="container">
              <p>Can not find the poster</p>
              <p>{movie.title}</p>
              <button onClick={() => this.handleClick("like", movie, buttonText1)} className="like">
                <i className="fa fa-heart"></i>&nbsp;
              {buttonText1}</button>
              <button onClick={() => this.handleClick("save", movie, buttonText2)} className="like">
                <i className="fa fa-heart"></i>&nbsp;
              {buttonText2}</button>
            </div>
          </div>
        )
      }
      else {
        const poster_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        return (
          <div key={movie.id} className="card" >
            <img src={poster_url} alt="pictures are unavailable" />
            <div className="container">
              <p>{movie.title}</p>
              <button onClick={() => this.handleClick("like", movie, buttonText1)} className="like">
                <i className="fa fa-heart"></i>&nbsp;
                {buttonText1}</button>
              <button onClick={() => this.handleClick("save", movie, buttonText2)} className="like">
                <i className="fa fa-heart"></i>&nbsp;
              {buttonText2}</button>
            </div>
          </div>
        )
      }

    });
    return (
      <div className='main'>
        {picItems}
      </div>
    )
  }
}
function mapStateToProps({ movies, favemovie, savemovie }) {
  return { movies: movies, favemovie: favemovie, savemovie: savemovie };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    Fetchingdata:Fetchingdata, Postingdata: Postingdata
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Bagher);