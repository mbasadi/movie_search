import {SAVEFETCH_MOVIE} from '../actions/index'
export default function (state=[],action){
  switch (action.type) {
    case SAVEFETCH_MOVIE:
    
      return [action.payload];
      default:
  }
  return state
}