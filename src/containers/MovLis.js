import React, { Component } from "react";
import Loading from "./loading";
import '../assets/styles/moviCard.scss';
import '../assets/styles/app.scss';
import './App.css';
import { connect } from 'react-redux'
import { Fetchingdata, Postingdata } from '../actions/index'
import { bindActionCreators } from 'redux'
import DateConverter from '../utils/dateConverter';
import { Favorite, Bookmark } from '@material-ui/icons';
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
  componentDidUpdate(prevProps) {
    const x = this.props.favemovie[0];
    const y = prevProps.favemovie[0];
    const x2 = this.props.savemovie[0];
    const y2 = prevProps.savemovie[0];

    if (y && y2) {
      if (x.results.length !== y.results.length || x2.results.length !== y2.results.length) {

        this.props.Fetchingdata('FAVEFETCH_MOVIE');
        this.props.Fetchingdata('SAVEFETCH_MOVIE');
      }
    }
  }
  handleClick(type, movie, buttonText) {
    // first determind wich botton is clicked then change the botton text, post data based on request and get the new list of liked and saved list
    if (type === "like") {
      let boulL = false;
      (buttonText === "unlike") ? boulL = false : boulL = true;

      this.props.Postingdata('FAVEPOST_MOVIE', movie.id, boulL);
      this.props.Fetchingdata('FAVEFETCH_MOVIE');
    } else {
      let boulL = false;
      (buttonText === "unsave") ? boulL = false : boulL = true;
      this.props.Postingdata('SAVEPOST_MOVIE', movie.id, boulL);
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
    // to prevent undesier cases 
    if (!fmovies || !fave || !savei) {
      return <Loading />;
    }
    //comparing lists and determined the botton state
    const picItems = fmovies.results.map(movie => {
      let buttonText1 = 'like';
      let fCN = "favoriteIcon"
      let buttonText2 = 'save';
      let wCN = "watchList"
      fave.results.map(ffa => {
        if (movie.id === ffa.id) {
          buttonText1 = 'unlike';
          fCN = "favoriteIconActive"
        }
      })
      savei.results.map(Saa => {
        if (movie.id === Saa.id) {
          buttonText2 = 'unsave';
          wCN = "watchListActive"
        }
      })
      const poster_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      return (
        <div key={movie.id} className="cardContainer" >
          <img src={poster_url} alt="pictures are unavailable" className={"poster"} />
          <div className={"infoWrapper"}>
            <div>
              <div className={"title"}>
                {movie.title}
              </div>
              <div className={"release_date"}>
                {DateConverter(movie.release_date)}
              </div>
            </div>
            <p className={"overview"}>
              {movie.overview}
            </p>
            <div className={"iconsWrapper"}>
              <Favorite className={fCN}
                onClick={() => this.handleClick("like", movie, buttonText1)} />
              <Bookmark className={wCN}
                onClick={() => this.handleClick("save", movie, buttonText2)} />
            </div>
          </div>
        </div>
      )
    }

    );
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
    Fetchingdata: Fetchingdata, Postingdata: Postingdata
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Bagher);