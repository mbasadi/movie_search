import { combineReducers } from 'redux';
import MovieReducer from './reducer_movie';
import FavMovieReducer from './reducer_fav_movies';
import SAVMovieReducer from './reducer_save_movies';
const rootReducer = combineReducers({
  movies:MovieReducer,
  favemovie:FavMovieReducer,
  savemovie:SAVMovieReducer
  
  
});



export default rootReducer;